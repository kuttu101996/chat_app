import React from "react";
import { ChatState } from "../context/ChatProvider";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  return (
    <>
      {selectedChat ? (
        <>
          <Box
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={{ base: "space-between" }}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {selectedChat.isGroupChat ? (
              <>
                <Text>{selectedChat.chatName.toUpperCase()}</Text>
                {
                  <UpdateGroupChatModal
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                }
              </>
            ) : (
              <>
                {getSender(user.userExist, selectedChat.users)}
                <ProfileModal
                  user={getSenderFull(user.userExist, selectedChat.users)}
                ></ProfileModal>
              </>
            )}
          </Box>
          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"flex-end"}
            p={3}
            bg={"#E8E8E8"}
            w={"100%"}
            h={"100%"}
            borderRadius={"lg"}
            overflowY={"hidden"}
          >
            {" "}
          </Box>
        </>
      ) : (
        <Box
          height={"100%"}
          w={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text fontSize={"4xl"}>Select an user to start conversation</Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
