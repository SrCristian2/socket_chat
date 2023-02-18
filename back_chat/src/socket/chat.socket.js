import { Server } from "socket.io";

let messages = ["Hola mundo"];

export const chatSocket = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("usuario conectado", socket.id);

    const sendMessages=()=>{
        io.emit("server:getMessages",messages)
    }

    sendMessages()

    socket.on("client:addMessage",(message)=>{
        // messages=[...messages,message]
        messages.push(message)
        sendMessages()
    })

    socket.on("disconnect", ()=>{
        console.log("usuario desconectado", socket.id)
    })
  });
};
