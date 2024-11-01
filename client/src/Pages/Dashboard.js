import React from "react";
import ResponsiveAppBar from "../Components/ResponsiveAppBar";
import ChatPage from "../Pages/ChatPage";
import SideBar from "../Components/SideBar";
import { Box } from "@mui/material";

export default function Dashboard() {
  return (
    <Box sx={{ display: "flex", background: "#1A1D20", height: "100vh" }}>
      <SideBar />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ResponsiveAppBar />
        <Box sx={{ flex: 1, overflow: "auto" }}>
          <ChatPage />
        </Box>
      </Box>
    </Box>
  );
}
