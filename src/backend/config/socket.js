import { Server } from "socket.io";

let onlineUsers = new Set();
const socketIdToEmail = new Map();
let ioInstance; // 👈 declare top-level io

const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:5174"],
      methods: ["GET", "POST"],
    },
  });

  ioInstance = io; // 👈 store for export

  io.on("connection", (socket) => {
    socket.on("send_message", (data) => {
      socket.broadcast.emit("receive_message", data);
    });

    socket.on("updated_checkpoints", (data) => {
      socket.broadcast.emit("receive_updated_cps", data);
    });

    socket.on("user_online", (email) => {
      onlineUsers.add(email);
      socketIdToEmail.set(socket.id, email);
      io.emit("online_users", Array.from(onlineUsers));
    });

    socket.on("user_offline", (email) => {
      onlineUsers.delete(email);
      socketIdToEmail.delete(socket.id);
      io.emit("online_users", Array.from(onlineUsers));
    });

    socket.on("get_online_users", () => {
      socket.emit("take_online_users", Array.from(onlineUsers));
    });

    socket.on("disconnect", () => {
      const email = socketIdToEmail.get(socket.id);
      if (email) {
        onlineUsers.delete(email);
        socketIdToEmail.delete(socket.id);
        io.emit("online_users", Array.from(onlineUsers));
      }
    });
  });
};

export const getSocketIO = () => ioInstance; // 👈 utility to access from controller

export default configureSocket;
