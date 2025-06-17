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
  const [cardInfo, setCardInfo] = useState({
  name: "",
  number: "",
  expiry: "",
  cvv: ""
});

  useEffect(() => {
    if (user?.email) {
      socket.emit("join_cart", user.email);
    }
  }, [user?.email]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const orders = await orderService.getCartOrders(user.email);
        setCartOrders(orders);
      } catch {
        toast.error("Failed to load cart");
      }
    };
    if (user?.role === "customer") loadCart();
  }, [user?.email, user?.role]);

  useEffect(() => {
    const refreshCart = async () => {
      try {
        const updatedOrders = await orderService.getCartOrders(user.email);
        setCartOrders(updatedOrders);
      } catch {
        toast.error("Failed to refresh cart");
      }
    };

    socket.on("cart_updated", ({ userEmail }) => {
      if (userEmail === user.email) refreshCart();
    });

    return () => socket.off("cart_updated");
  }, [user.email]);

  useEffect(() => {
    const forceRefresh = async () => {
      try {
        const updatedOrders = await orderService.getCartOrders(user.email);
        setCartOrders(updatedOrders);
      } catch {
        toast.error("Failed to manually refresh cart");
      }
    };

    window.addEventListener("cart_force_refresh", forceRefresh);
    return () => window.removeEventListener("cart_force_refresh", forceRefresh);
  }, [user.email]);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await notificationService.fetchNotifications(user.email);
        setNotifications(data);
        setUnreadCount(data.filter((n) => !n.isRead).length);
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

  const handleRemoveOrder = async (orderId) => {
    try {
      await orderService.deleteOrder(orderId);
      setCartOrders((prev) => prev.filter((o) => o._id !== orderId));
      socket.emit("cart_updated", { userEmail: user.email });
    } catch {
      toast.error("Failed to delete order");
    }
  };

  const handleConfirmPurchase = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSelect = (method) => {
    setSelectedPaymentMethod(method);
    setShowPaymentModal(false);
    if (method === "cash") {
      toast.success("Cash order placed successfully");
      socket.emit("cart_updated", { userEmail: user.email });
    }
  };

  const handlePayNow = () => {
    if (cardInfo.number && cardInfo.expiry && cardInfo.cvv) {
      toast.success("Payment successful");
      setSelectedPaymentMethod(null);
      setCardInfo({ number: "", expiry: "", cvv: "" });
      socket.emit("cart_updated", { userEmail: user.email });
    } else {
      toast.error("Please fill all card fields");
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
          onSelect={handlePaymentSelect}
          onClose={() => setShowPaymentModal(false)}
        />
      )}

      {selectedPaymentMethod === "card" && (
        <PopUpPage onClose={() => setSelectedPaymentMethod(null)}>
          <CardPaymentSimulator
              cardInfo={cardInfo}
              setCardInfo={setCardInfo}
              onPay={handlePayNow}
            />
        </PopUpPage>
      )}
    </HeaderSection>
  );
};

export default UserProfileHeader;
