import React, { useState } from "react";
import ResponsiveAppBar from "../Components/ResponsiveAppBar";
import ChatPage from "../Pages/ChatPage";
import SideBar, { MessagesContext } from "../Components/SideBar";
import { Box } from "@mui/material";

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);

  return (
    <Box sx={{ display: "flex", background: "#1A1D20", height: "100vh" }}>
      <SideBar setMessages={setMessages} setSelectedChatId={setSelectedChatId} />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <ResponsiveAppBar />
        <Box sx={{ flex: 1, overflow: "auto" }}>
          <MessagesContext.Provider value={messages}>
            <ChatPage messages={messages} selectedChatId={selectedChatId} setMessages={setMessages} />
          </MessagesContext.Provider>
        </Box>
      </Box>
    </Box>
  );
}
