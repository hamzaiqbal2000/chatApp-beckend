import React, { useEffect, useState } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [base64Images, setBase64Images] = useState([]);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    socket.on("ImageReceive", (data) => {
      console.log({ data });
      setBase64Images([...base64Images, data.file]);
    });
  }, [socket, base64Images]);

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody messages={messages} base64Images={base64Images} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
