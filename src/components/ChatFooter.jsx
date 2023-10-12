import React, { useState } from "react";
import FileBase64 from "react-file-base64";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    if (base64Image) {
      console.log("HERE");
      sendImageToServer();
    }
    setMessage("");
    setBase64Image(null);
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const convertImageToBase64 = () => {
    // const reader = new FileReader();
    // reader.onload = () => {
    //   setBase64Image(reader.result);
    //   return reader.result;
    // };

    // let document = "";
    let reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = function () {
      const base64Image1 = reader.result;
      console.log({ base64Image1 });
      socket.emit("image-upload", {
        file: base64Image1,
        name: localStorage.getItem("userName"),
        //   id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };

    // return document;

    // return new Promise((resolve, reject) => {
    //   reader.onload = () => {
    //     resolve(reader.result);
    //   };

    //   reader.onerror = (error) => {
    //     reject(error);
    //   };
    // });
    // console.log({ result });
    // reader.readAsDataURL(imageFile);
  };

  const sendImageToServer = async () => {
    // convertImageToBase64();
    console.log({ base64Image });
    socket.emit("imageUpload", {
      file: base64Image,
      name: localStorage.getItem("userName"),
      //   id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
    });
  };

  const getFiles = (files) => {
    console.log({ files });
    setBase64Image(files[0].base64);
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
      <FileBase64 multiple={true} onDone={getFiles} />
      {/* <input type="file" onChange={handleImageChange} /> */}
      {/* <button onClick={convertImageToBase64}>Convert to Base64</button>
      <button onClick={sendImageToServer}>Send to Server</button> */}
    </div>
  );
};

export default ChatFooter;
