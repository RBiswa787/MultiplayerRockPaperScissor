import io from "socket.io-client";
const socketEndpoint = "https://6d46-122-161-76-65.in.ngrok.io";
const socket = io(socketEndpoint,{
  transports: ['websocket']});
export {socket}
//https://appygm.herokuapp.com/