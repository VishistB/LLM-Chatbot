import React, { useContext, useEffect } from "react";
import { Stack, Box, TextField, IconButton, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { MessagesContext } from "../Components/SideBar";

export default function ChatPage() {
  const messages = useContext(MessagesContext);

  useEffect(() => {
    console.log("Messages in ChatPage:", messages);
  }, [messages]);

  return (
    <Stack
      height="100%"
      justifyContent="center"
      alignItems="center"
      sx={{ color: "white", padding: 0, backgroundColor: "#1A1D20" }}
    >
      {/* Chat Window */}
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
          {/* Display a default message if no messages are present */}
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
                sx={{
                  display: "flex",
                  justifyContent:
                    msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    maxWidth: "70%",
                    backgroundColor:
                      msg.sender === "user" ? "#4B4F57" : "#3A3F45",
                    padding: 1,
                    borderRadius: 2,
                    alignSelf:
                      msg.sender === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  {msg.content}
                </Typography>
              </Box>
            ))
          )}
        </Box>

        {/* Input Area */}
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
          <IconButton sx={{ marginLeft: 2, color: "#4A9E8F" }}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Stack>
  );
}
