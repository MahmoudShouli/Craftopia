import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import UserAvatar from "../../useravatar/UserAvatar";
import NotificationMenu from "../../Notifications/NotificationMenu";
import notificationService from "../../../api/notificationService";
import * as orderService from "../../../api/orderService";
import { toast } from "react-toastify";
import { socket } from "../../../../utils/socket";
import CartMenu from "../../cart/CartMenu";

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

  // ✅ Join socket room for cart updates
  useEffect(() => {
    if (user?.email) {
      socket.emit("join_cart", user.email);
    }
  }, [user?.email]);

  // ✅ Load cart count on mount (before clicking cart)
  useEffect(() => {
    const loadCart = async () => {
      try {
        const orders = await orderService.getCartOrders(user.email);
        setCartOrders(orders);
      } catch {
        toast.error("Failed to load cart");
      }
    };

    if (user?.role === "customer") {
      loadCart();
    }
  }, [user?.email, user?.role]);

  // ✅ Real-time cart updates from socket
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
      if (userEmail === user.email) {
        refreshCart();
      }
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

  // ✅ Load notifications
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

  // ✅ Real-time notifications from socket
  useEffect(() => {
    socket.on("receive_notification", (notification) => {
      setNotifications((prev) => [...prev, notification]);
    });
    return () => socket.off("receive_notification");
  }, []);

  // Toggle cart popup
  const toggleCart = async () => {
    setShowCart((prev) => !prev);
    if (!showCart) {
      try {
        const orders = await orderService.getCartOrders(user.email);
        setCartOrders(orders);
      } catch {
        toast.error("Failed to load cart orders");
      }
    }
  };

  // Handle cart item remove
  const handleRemoveOrder = async (orderId) => {
    try {
      await orderService.deleteOrder(orderId);
      setCartOrders((prev) => prev.filter((o) => o._id !== orderId));
      socket.emit("cart_updated", { userEmail: user.email });
    } catch (err) {
      toast.error("Failed to delete order");
    }
  };

  // Handle purchase confirmation
  const handleConfirmPurchase = () => {
    toast.success("Purchase confirmed!");
    socket.emit("cart_updated", { userEmail: user.email });
  };

  return (
    <HeaderSection>
      <HeaderLeft>
        <WelcomeText>Welcome, {user.name}</WelcomeText>
        <DateText>{formattedDate}</DateText>
      </HeaderLeft>

      <HeaderRight>
        {/* 🛒 Cart icon */}
        {user?.role === "customer" && (
          <IconWrapper onClick={toggleCart} $highlight={cartOrders.length > 0}>
            <Icon>
              <FaShoppingCart />
            </Icon>
            {cartOrders.length > 0 && (
              <NotificationBadge>{cartOrders.length}</NotificationBadge>
            )}
            {showCart && (
              <MenuPopup>
                <CartMenu
                  cartOrders={cartOrders}
                  onRemove={handleRemoveOrder}
                  onConfirm={handleConfirmPurchase}
                />
                <div
                  style={{
                    marginTop: "8px",
                    cursor: "pointer",
                    textAlign: "right",
                    color: "#6a380f",
                  }}
                  onClick={() => setShowCart(false)}
                >
                  Close
                </div>
              </MenuPopup>
            )}
          </IconWrapper>
        )}

        {/* 🔔 Notification icon */}
        <IconWrapper
          onClick={() => setShowNotifications(!showNotifications)}
          $state={unreadCount}
        >
          <Icon>🔔</Icon>
          {unreadCount > 0 && (
            <NotificationBadge>{unreadCount}</NotificationBadge>
          )}
          {showNotifications && (
            <NotificationMenu
              notifications={notifications}
              setNotifications={setNotifications}
              redirect={redirect}
            />
          )}
        </IconWrapper>

        {/* 🧑 User Avatar */}
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
    </HeaderSection>
  );
};

export default UserProfileHeader;
