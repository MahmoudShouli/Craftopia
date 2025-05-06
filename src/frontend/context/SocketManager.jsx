import { useEffect } from "react";
import { useUser } from "./UserContext";
import { socket } from "../../utils/socket";

const SocketManager = () => {
  const { user } = useUser();

  useEffect(() => {
    if (user?.email) {
      socket.emit("user_online", user.email);
    }

    const handleReconnect = () => {
      if (user?.email) {
        socket.emit("user_online", user.email);
      }
    };

    socket.on("connect", handleReconnect);

    return () => {
      socket.off("connect", handleReconnect);
    };
  }, [user?.email]);

  return null;
};

export default SocketManager;
