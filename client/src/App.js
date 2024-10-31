import "./App.css";
import { Box } from "@mui/material";
import ResponsiveAppBar from  "./Components/ResponsiveAppBar";
import ChatPage from "./Pages/ChatPage";
import SideBar from "./Components/SideBar";

function App() {
  return (
    <Box sx={{ display: "flex", background: "#1A1D20", height: "100vh" }}>

      <SideBar/>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          // marginLeft: { xs: 0, sm: "250px" },
        }}
      >
        {/* AppBar */}
        <ResponsiveAppBar />

        {/* ChatPage to fill remaining space */}
        <Box sx={{ flex: 1, overflow: "auto" }}>
          <ChatPage />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
