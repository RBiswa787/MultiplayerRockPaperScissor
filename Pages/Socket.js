import io from "socket.io-client";
const socketEndpoint = "https://1c53-122-161-74-149.in.ngrok.io";
const socket = io(socketEndpoint,{
  transports: ['websocket']});
export {socket}