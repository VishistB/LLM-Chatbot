import React from "react";
import { Stack, Divider, Box, Typography, MenuItem } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Logo from "../Assets/Mimir_Logo.png";

export default function SideBar() {
  const chatlist = ["chat1", "chat2", "chat3"];
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
      <Stack alignItems="center">
        <Typography variant="subtitle1" color="white" sx={{margin:"20px auto"}}>
          CHATS
        </Typography>
        {chatlist.map((elem) => (
            <MenuItem backgroundColor="">
                <Typography color="white">
                    {elem}
                </Typography>
            </MenuItem>
        ))}
      </Stack>
    </Drawer>
  );
}
