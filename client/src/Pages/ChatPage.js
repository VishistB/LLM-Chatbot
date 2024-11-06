import React, { useContext, useEffect, useState } from "react";
import { Stack, Box, TextField, IconButton, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { MessagesContext } from "../Components/SideBar";

export default function ChatPage({ selectedChatId, setMessages }) {
  const messages = useContext(MessagesContext);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = async () => {
    if (!inputMessage || !selectedChatId) return;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE}/api/chats/${selectedChatId}/prompt_response/`,
        { prompt: inputMessage },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", content: inputMessage },
        { sender: "mimir", content: response.data.response },
      ]);
      setInputMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Stack
      height="100%"
      justifyContent="center"
      alignItems="center"
      sx={{ color: "white", padding: 0, backgroundColor: "#1A1D20" }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1000,
          height: "80%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            padding: 2,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {messages.length === 0 ? (
            <Typography
              variant="body2"
              sx={{
                maxWidth: "70%",
                backgroundColor: "#3A3F45",
                padding: 1,
                borderRadius: 2,
                alignSelf: "center",
              }}
            >
              Start a new conversation by typing a message below.
            </Typography>
          ) : (
            messages.map((msg, index) => (
              <Box
              key={index}
              my={2}
              sx={{
                display: "flex",
                justifyContent:
                msg.sender === "mimir" ? "flex-start" : "flex-end",
              }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    maxWidth: "70%",
                    backgroundColor:
                      msg.sender === "user" ? "#4B4F57" : "#3A3F45",
                    padding: 2,
                    borderRadius: 2,
                    fontSize:"1rem"
                  }}
                >
                  {/* {msg.sender} */}
                  {msg.content}
                </Typography>
              </Box>
            ))
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#1A1D20",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Type a message"
            fullWidth
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            sx={{
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#4A9E8F",
                },
                "&:hover fieldset": {
                  borderColor: "#666",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#777",
                },
              },
            }}
          />
          <IconButton
            onClick={handleSendMessage}
            sx={{ marginLeft: 2, color: "#4A9E8F" }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Stack>
  );
}

