const { io } = require("socket.io-client");

const socket = io("http://localhost:4000");

socket.on("connect", () => {
  console.log("połączono, id:", socket.id);
  socket.emit("helloFromClient", { msg: "hej serwer" });
});

socket.on("disconnect", () => {
  console.log("rozłączono");
});

socket.on("someEvent", data => {
  console.log("someEvent:", data);
});
