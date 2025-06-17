import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import UserAvatar from "../../useravatar/UserAvatar";
import NotificationMenu from "../../Notifications/NotificationMenu";
import notificationService from "../../../api/notificationService";
import * as orderService from "../../../api/orderService";
import { toast } from "react-toastify";
import { socket } from "../../../../utils/socket";
import CartMenu from "../../cart/CartMenu";
import PaymentMethodModal from "../../cart/PaymentMethodModal";
import CardPaymentSimulator from "../../cart/CardPaymentSimulator";
import PopUpPage from "../../map/PopUpPage";

import {
  HeaderSection,
  HeaderLeft,
  WelcomeText,
  DateText,
  HeaderRight,
  IconWrapper,
  Icon,
  NotificationBadge,
  MenuPopup,
} from "./UserProfileHeader.styled";

const UserProfileHeader = ({ user, formattedDate, redirect }) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [cartOrders, setCartOrders] = useState([]);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [cardInfo, setCardInfo] = useState({ number: "", expiry: "", cvv: "" });

  useEffect(() => {
    if (user?.email) {
      socket.emit("join_cart", user.email);
    }
  }, [user?.email]);

  const refreshCart = async () => {
    try {
      const updatedOrders = await orderService.getCartOrders(user.email);
      setCartOrders(updatedOrders);
    } catch {
      toast.error("Failed to refresh cart");
    }
  };

  useEffect(() => {
    if (user?.role === "customer") {
      refreshCart();
    }
  }, [user?.email, user?.role]);

  useEffect(() => {
    socket.on("cart_updated", ({ userEmail }) => {
      if (userEmail === user.email) refreshCart();
    });
    return () => socket.off("cart_updated");
  }, [user.email]);

  useEffect(() => {
    const forceRefresh = () => refreshCart();
    window.addEventListener("cart_force_refresh", forceRefresh);
    return () => window.removeEventListener("cart_force_refresh", forceRefresh);
  }, [user.email]);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await notificationService.fetchNotifications(user.email);
        setNotifications(data);
      } catch {
        toast.error("Failed to load notifications");
      }
    };
    loadNotifications();
  }, [user.email]);

  useEffect(() => {
    socket.on("receive_notification", (notification) => {
      setNotifications((prev) => [...prev, notification]);
    });
    return () => socket.off("receive_notification");
  }, []);

  // 🔁 Real-time unread count update
  useEffect(() => {
    const unread = notifications.filter((n) => !n.isRead).length;
    setUnreadCount(unread);
  }, [notifications]);

 const handleRemoveOrder = async (orderId) => {
  try {
    const orderToDelete = cartOrders.find((o) => o._id === orderId);

    await orderService.deleteOrder(orderId);
    setCartOrders((prev) => prev.filter((o) => o._id !== orderId));
    socket.emit("cart_updated", { userEmail: user.email });

    if (orderToDelete) {
      const notification = {
        text: `${user.name} removed ${orderToDelete.templateName || "a template"} from their cart`,
        linkTo: "Orders",
        email: orderToDelete.crafterEmail,
      };

      await notificationService.createNotification(notification);
      socket.emit("notification", {
        to: orderToDelete.crafterEmail,
        notification,
      });
    }
  } catch {
    toast.error("Failed to delete order");
  }
};

  const clearCartUIOnly = () => {
    setCartOrders([]);
    socket.emit("cart_updated", { userEmail: user.email });
  };

  const handleConfirmPurchase = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSelect = async (method) => {
    setSelectedPaymentMethod(method);
    setShowPaymentModal(false);

    if (method === "cash") {
      try {
        await Promise.all(
          cartOrders.map((order) =>
            orderService.updateOrder(order._id, "confirmed", "unpaid")
          )
        );
        toast.success("Cash order placed successfully");
        clearCartUIOnly();
        await refreshCart();
        setSelectedPaymentMethod(null);
      } catch {
        toast.error("Failed to process cash payment");
      }
    }
  };

  const handlePayNow = async () => {
    if (!cardInfo.number || !cardInfo.expiry || !cardInfo.cvv) {
      toast.error("Please fill all card fields");
      return;
    }

    try {
      await Promise.all(
        cartOrders.map((order) =>
          orderService.updateOrder(order._id, "confirmed", "paid")
        )
      );
      toast.success("Payment successful");
      clearCartUIOnly();
      await refreshCart();
      setSelectedPaymentMethod(null);
      setCardInfo({ number: "", expiry: "", cvv: "" });
    } catch {
      toast.error("Failed to process card payment");
    }
  };

  return (
    <HeaderSection>
      <HeaderLeft>
        <WelcomeText>Welcome, {user.name}</WelcomeText>
        <DateText>{formattedDate}</DateText>
      </HeaderLeft>

      <HeaderRight>
        {user?.role === "customer" && (
          <IconWrapper onClick={() => setShowCart((prev) => !prev)} $highlight={cartOrders.length > 0}>
            <Icon>
              <FaShoppingCart />
            </Icon>
            {cartOrders.length > 0 && <NotificationBadge>{cartOrders.length}</NotificationBadge>}
            {showCart && (
              <MenuPopup>
                <CartMenu
                  cartOrders={cartOrders}
                  onRemove={handleRemoveOrder}
                  onConfirm={handleConfirmPurchase}
                />
                <div
                  style={{ marginTop: "8px", cursor: "pointer", textAlign: "right", color: "#6a380f" }}
                  onClick={() => setShowCart(false)}
                >
                  Close
                </div>
              </MenuPopup>
            )}
          </IconWrapper>
        )}

        <IconWrapper onClick={() => setShowNotifications(!showNotifications)} $state={unreadCount}>
          <Icon>🔔</Icon>
          {unreadCount > 0 && <NotificationBadge>{unreadCount}</NotificationBadge>}
          {showNotifications && (
            <NotificationMenu
              notifications={notifications}
              setNotifications={setNotifications}
              redirect={redirect}
            />
          )}
        </IconWrapper>

        <IconWrapper style={{ padding: 0 }}>
          <UserAvatar
            previewUrl={user.avatarUrl}
            uploading={false}
            user={user}
            width={50}
            height={50}
          />
        </IconWrapper>
      </HeaderRight>

      {showPaymentModal && (
        <PaymentMethodModal
          orderIds={cartOrders.map((order) => order._id)}
          onSelect={handlePaymentSelect}
          onClose={() => setShowPaymentModal(false)}
          onPaymentDone={refreshCart}
        />
      )}

      {selectedPaymentMethod === "card" && (
        <PopUpPage onClose={() => setSelectedPaymentMethod(null)}>
          <CardPaymentSimulator
            cardInfo={cardInfo}
            setCardInfo={setCardInfo}
            onPaymentDone={handlePayNow}
            orderIds={cartOrders.map((order) => order._id)}
          />
        </PopUpPage>
      )}
    </HeaderSection>
  );
};

export default UserProfileHeader;
