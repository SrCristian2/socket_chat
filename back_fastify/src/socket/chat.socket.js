

let messages = [{message:"hola mundo",hour:164546452315}];

export const chatSocket = (fastify) => {
  fastify.io.on("connection", (socket) => {
    console.log("usuario conectado", socket.id);

    const sendMessages=()=>{
        fastify.io.emit("server:getMessages",messages)
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
