import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideComing from "./miscellaneous/SideComing";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";

// const Chat = () => {
//   const [data, setData] = useState([]);

//   const fetchChats = async () => {
//     const getToken = JSON.parse(localStorage.getItem("userInfo")).token;

//     const head = {
//       headers: {
//         "Content-type": "application/json",
//         authorization: `bearer ${getToken}`,
//       },
//     };
//     const { data } = await axios.get("http://localhost:4444/api/chat", head);

//     setData(data);
//     console.log(data);
//   };

//   useEffect(() => {
//     fetchChats();
//   }, []);

//   return (
//     <div>
//       <h2>Chat Page</h2>
//       {/* {data.map((ele) => {
//         ele.name;
//       })} */}
//     </div>
//   );
// };

const Chat = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideComing />}
      <Box
        display="flex"
        justifyContent={"space-between"}
        w={"100%"}
        h={"91vh"}
        p={"10px"}
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default Chat;
