import React, { useState } from "react";
import {
  Stack,
  Divider,
  Box,
  Typography,
  MenuItem,
  IconButton,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Logo from "../Assets/Mimir_Logo.png";
import ChatIcon from "@mui/icons-material/Chat";
import DeleteIcon from "@mui/icons-material/Delete";

export default function SideBar() {
  const chatlist = ["CHAT - 1", "CHAT - 2", "CHAT - 3"];
  const [selectedChat,setSelectedChat] = useState(0);
  return (
    <Drawer
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          backgroundColor: "#23262A",
          width: 250,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <img src={Logo} width="200px" style={{ margin: "0 auto" }} />
      <Divider />
      <Stack>
        <Typography color="#76808a" mt={3} mb={1} ml={2}>
          CHATS
        </Typography>
        <Stack alignItems="center" width="100%" gap={2}>
          {chatlist.map((elem, index) => (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{
                backgroundColor:
                  index === selectedChat ? "#34393e" : "rgba(0,0,0,0)",
                width:"90%",
              }}
              borderRadius={2}
              key={index}
            >
              <MenuItem
                sx={{
                  backgroundColor: "rgba(0,0,0,0)",
                  width: "90%",
                  margin: "0 auto",
                  borderRadius: 1,
                  //   "&:hover": {
                  //     backgroundColor: "#34393f", // Set your desired hover color here
                  //   },
                }}
                onClick={() => setSelectedChat(index)}
              >
                <Typography mr={1} color="white">
                  {elem}
                </Typography>
                <ChatIcon sx={{ color: "#4A9E8F" }}></ChatIcon>
              </MenuItem>
              <IconButton>
                <DeleteIcon sx={{ color: "#FF0000" }}></DeleteIcon>
              </IconButton>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Drawer>
  );
}
