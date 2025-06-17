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

  // Join socket room for this user
  useEffect(() => {
    if (user?.email) {
      socket.emit("join", user.email);
    }
  }, [user?.email]);

  // Load notifications once
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

  // Listen for real-time notifications
  useEffect(() => {
    socket.on("receive_notification", (notification) => {
      setNotifications((prev) => [...prev, notification]);
    });
    return () => socket.off("receive_notification");
  }, []);

  // Listen for real-time cart updates
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

  const handleRemoveOrder = async (orderId) => {
    try {
      await orderService.deleteOrder(orderId);
      toast.success("Removed from cart");
      setCartOrders((prev) => prev.filter((o) => o._id !== orderId));
      socket.emit("cart_updated", { userEmail: user.email }); // notify self and others
    } catch (err) {
      toast.error("Failed to delete order");
    }
  };

  const handleConfirmPurchase = () => {
    toast.success("Purchase confirmed!");
    socket.emit("cart_updated", { userEmail: user.email }); // trigger refresh
  };

  return (
    <HeaderSection>
      <HeaderLeft>
        <WelcomeText>Welcome, {user.name}</WelcomeText>
        <DateText>{formattedDate}</DateText>
      </HeaderLeft>

      <HeaderRight>
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
