import "./App.css";
import { Box } from "@mui/material";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import ChatPage from "./Pages/ChatPage";
import SideBar from "./Components/SideBar";
import { useState } from "react";
import LoginPage from "./Pages/LoginPage";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      {!isLoggedIn ? (
        <LoginPage />
      ) : (
        <Box sx={{ display: "flex", background: "#1A1D20", height: "100vh" }}>
          <SideBar />
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              // marginLeft: { xs: 0, sm: "250px" },
            }}
          >
            <ResponsiveAppBar />

            <Box sx={{ flex: 1, overflow: "auto" }}>
              <ChatPage />
            </Box>
          </Box>
        </Box>
      )}
    </BrowserRouter>
  );
}

export default App;
