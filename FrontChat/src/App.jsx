import moment from "moment/moment";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSocket } from "./hooks/useSocket";

function App() {
  //Aqui guardamos los mensajes que van a llegar desde socket.
  const [messages, setMessages] = useState([]);

  //Aqui guardamos los mensajes de nuestro usuario que esta escribiendo

  const [message, setMessage] = useState("");

  const inputRef = useRef();

  const { socket } = useSocket("http://localhost:4000");

  useEffect(() => {
    getMessages();
  }, []);

  //Para obtener los mensajes de nuestro backend

  //Cuando tenemos una funcion dentro se un useEffect, es recomendable usar otro hook llamado useCALLBACK , para memorizar esa funcion y ahorrar rendimiento

  const getMessages = useCallback(() => {
    socket.on("server:getMessages", (messages) => {
      setMessages(messages);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    //Listo, con esta funcion lo que tenemos en nuestro estado lo vamos
    //messages, lo vamos a guardar en nuestro servidor
    socket.emit("client:addMessage", { message, date: Date.now() });
    setMessage("");
    inputRef.current.focus();
  };

  return (
    <div className="container mt-4">
      <div className="col-6">
        <form action="" onSubmit={sendMessage}>
          <div className="mb-3">
            <input
              className="form-control form-control-sm"
              type="text"
              name="message"
              autoFocus
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              ref={inputRef}
            />
          </div>
          <button type="submit" className="btn btn-primary mb-3">
            Enviar
          </button>
        </form>
      </div>
      <div className="col-12">
        <ul className="list-group">
          {messages.map((message, i) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center "
              key={i}
            >
              {message.message}
              <span className="badge bg-primary rounded-pill">
                {moment(message.date).format("MMM Do YY")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
