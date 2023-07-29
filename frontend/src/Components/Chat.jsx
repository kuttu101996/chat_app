import React, { useEffect, useState } from "react";
import axios from "axios";

const Chat = () => {
  const [data, setData] = useState([]);

  const fetchChats = async () => {
    const { data } = await axios.get("http://localhost:4444/chats");

    setData(data.data);
    console.log(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      <h2>Chat Page</h2>
      {data.map((ele)=> {
        ele.name
      })}
    </div>
  );
};

export default Chat;
