import "./App.css";
import Drawer from '@mui/material/Drawer';
import { Stack, Divider, Box } from "@mui/material";
import Logo from './Assets/Mimir_Logo.png';
import ResponsiveAppBar from  "./Components/ResponsiveAppBar";
import ChatPage from "./Pages/ChatPage";

function App() {
  return (
    <Box sx={{ display: "flex", background: "#1A1D20", height: "100vh" }}>
      {/* Drawer */}
      <Drawer
        sx={{
          width: 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            backgroundColor: "#23262A",
            width: 250,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <img src={Logo} width="200px" style={{ margin: "0 auto" }} />
        <Divider />
      </Drawer>

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
