import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaTrash, FaSearch, FaBell, FaBullhorn } from "react-icons/fa";
import { fetchAllUsers, deleteUser } from "../../../api/userService";
import notificationService from "../../../api/notificationService";
import { socket } from "../../../../utils/socket";
import { toast } from "react-toastify";
import Modal from "../../modals/Modal";

const TableWrapper = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ToggleSearchButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    color: #333;
    font-size: 1.2rem;
  }
`;

const SearchContainer = styled.div`
  max-width: ${({ visible }) => (visible ? "200px" : "0")};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  overflow: hidden;
  transition: max-width 0.3s ease, opacity 0.3s ease;
`;

const SearchInput = styled.input`
  padding: 6px 16px;
  border: 1px solid #ccc;
  border-radius: 30px;
  font-size: 0.9rem;
  background: white;
  width: 180px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  outline: none;
`;

const ScrollContainer = styled.div`
  max-height: 500px;
  overflow-y: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 12px;
  text-align: left;
  color: #444;
  font-weight: 600;
  background: #fafafa;
  position: sticky;
  top: 0;
  z-index: 1;
  cursor: ${(props) => (props.sortable ? "pointer" : "default")};
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eee;
`;

const Avatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const DeleteButton = styled.button`
  background: #ff4d4f;
  border: none;
  padding: 8px;
  border-radius: 8px;
  color: white;
  cursor: pointer;
`;

const NotifyButton = styled.button`
  background: rgb(223, 203, 23);
  border: none;
  padding: 8px;
  border-radius: 8px;
  color: white;
  cursor: pointer;

  &:hover {
    background: rgb(128, 116, 9);
  }
`;

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [announcementMessage, setAnnouncementMessage] = useState("");
  const [isSendingAll, setIsSendingAll] = useState(false);

  const loadUsers = async () => {
    const allUsers = await fetchAllUsers();
    const nonAdmins = allUsers.filter((user) => user.role !== "admin");
    setUsers(nonAdmins);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      alert("Failed to delete user.");
    }
  };

  const openNotificationModal = (user) => {
    setSelectedUser(user);
    setNotificationMessage("");
    setShowModal(true);
  };

  const sendNotification = async () => {
    if (!notificationMessage.trim()) {
      toast.warning("Message cannot be empty.");
      return;
    }

    try {
      const notification = {
        text: "The admin sent you a message: " + notificationMessage,
        linkTo: "Notifications",
        email: selectedUser.email,
      };

      await notificationService.createNotification(notification);
      socket.emit("notification", {
        to: selectedUser.email,
        notification,
      });

      toast.success(`Notification sent to ${selectedUser.name}`);
      setShowModal(false);
    } catch (error) {
      console.error("Notify error:", error);
      toast.error("Failed to send notification.");
    }
  };

  const sendAnnouncementToAll = async () => {
    if (!announcementMessage.trim()) {
      toast.warning("Message cannot be empty.");
      return;
    }

    try {
      setIsSendingAll(true);

      for (const user of users) {
        const notification = {
          text: "Announcement from Admin: " + announcementMessage,
          linkTo: "Notifications",
          email: user.email,
        };

        await notificationService.createNotification(notification);
        socket.emit("notification", {
          to: user.email,
          notification,
        });
      }

      toast.success("Announcement sent to all users");
      setAnnouncementMessage("");
      setShowAnnouncementModal(false);
    } catch (err) {
      toast.error("Failed to send announcements.");
      console.error(err);
    } finally {
      setIsSendingAll(false);
    }
  };

  const handleSortByRole = () => {
    const sorted = [...users].sort((a, b) => {
      const roleA = a.role.toLowerCase();
      const roleB = b.role.toLowerCase();
      if (roleA < roleB) return sortOrder === "asc" ? -1 : 1;
      if (roleA > roleB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setUsers(sorted);
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <TableWrapper>
      <HeaderRow>
        <h2>All Users</h2>
        <SearchWrapper>
          <ToggleSearchButton onClick={() => setShowAnnouncementModal(true)}>
            <FaBullhorn />
          </ToggleSearchButton>
          <ToggleSearchButton onClick={() => setShowSearch((prev) => !prev)}>
            <FaSearch />
          </ToggleSearchButton>
          <SearchContainer visible={showSearch}>
            <SearchInput
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => {
                if (searchQuery.trim() === "") setShowSearch(false);
              }}
            />
          </SearchContainer>
        </SearchWrapper>
      </HeaderRow>

      <ScrollContainer>
        <Table>
          <thead>
            <tr>
              <Th>Avatar</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th sortable="true" onClick={handleSortByRole}>
                Role ⬍
              </Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((user) => (
                <tr key={user._id}>
                  <Td>
                    <Avatar
                      src={user.avatarUrl || "/assets/default-avatar.png"}
                      alt="avatar"
                    />
                  </Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>
                  <Td>
                    <ActionButtons>
                      <DeleteButton onClick={() => handleDelete(user._id)}>
                        <FaTrash />
                      </DeleteButton>
                      <NotifyButton onClick={() => openNotificationModal(user)}>
                        <FaBell />
                      </NotifyButton>
                    </ActionButtons>
                  </Td>
                </tr>
              ))}
          </tbody>
        </Table>
      </ScrollContainer>

      {/* Modal for individual user */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h3>Send Notification</h3>
          <p>
            To: <strong>{selectedUser?.name}</strong>
          </p>
          <textarea
            rows="4"
            placeholder="Type your message..."
            value={notificationMessage}
            onChange={(e) => setNotificationMessage(e.target.value)}
            style={{
              width: "100%",
              borderRadius: "8px",
              padding: "10px",
              border: "1px solid #ccc",
              marginTop: "10px",
            }}
          />
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <button onClick={() => setShowModal(false)} style={{ padding: "8px 12px" }}>
              Cancel
            </button>
            <button
              onClick={sendNotification}
              style={{
                padding: "8px 12px",
                background: "#6a380f",
                color: "white",
                border: "none",
                borderRadius: "6px",
              }}
            >
              Send
            </button>
          </div>
        </Modal>
      )}

      {/* Modal for announcement */}
      {showAnnouncementModal && (
        <Modal onClose={() => setShowAnnouncementModal(false)}>
          <h3>Announce to All Users</h3>
          <textarea
            rows="4"
            placeholder="Type your announcement..."
            value={announcementMessage}
            onChange={(e) => setAnnouncementMessage(e.target.value)}
            style={{
              width: "100%",
              borderRadius: "8px",
              padding: "10px",
              border: "1px solid #ccc",
              marginTop: "10px",
            }}
          />
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <button onClick={() => setShowAnnouncementModal(false)} style={{ padding: "8px 12px" }}>
              Cancel
            </button>
            <button
              onClick={sendAnnouncementToAll}
              disabled={isSendingAll}
              style={{
                padding: "8px 12px",
                background: "#6a380f",
                color: "white",
                border: "none",
                borderRadius: "6px",
              }}
            >
              {isSendingAll ? "Sending..." : "Send"}
            </button>
          </div>
        </Modal>
      )}
    </TableWrapper>
  );
};

export default UserTable;
