import { Server } from "socket.io";

let onlineUsers = new Set();

const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:5174"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("send_message", (data) => {
      socket.broadcast.emit("receive_message", data);
    });

    socket.on("user_online", (email) => {
      onlineUsers.add(email);
      io.emit("online_users", Array.from(onlineUsers));
    });

    socket.on("disconnect", () => {
      io.emit("online_users", Array.from(onlineUsers));
    });
  });
};

export default configureSocket;
