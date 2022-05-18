import io from "socket.io-client";
const socketEndpoint = "https://appygm.herokuapp.com/";
const socket = io(socketEndpoint,{
  transports: ['websocket']});
export {socket}
//https://appygm.herokuapp.com/