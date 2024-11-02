import React, { useState, useEffect } from "react";
import {
  Stack,
  Divider,
  Typography,
  MenuItem,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Logo from "../Assets/Mimir_Logo.png";
import ChatIcon from "@mui/icons-material/Chat";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

export default function SideBar() {
  const [chatlist, setChatlist] = useState([]);
  const [selectedChat, setSelectedChat] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [newChatName, setNewChatName] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/chats/", {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("accessToken")}` }
      });
      setChatlist(response.data);
    } catch (error) {
      console.error("Failed to load chats:", error);
    }
  };

  const confirmDeleteChat = (chat_id) => {
    setChatToDelete(chat_id);
    setConfirmDialogOpen(true);
  };

  const handleDeleteChat = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/chats/${chatToDelete}/delete_chat/`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("accessToken")}` }
      });
      setChatlist(chatlist.filter(chat => chat.chat_id !== chatToDelete));
      setConfirmDialogOpen(false);
      setChatToDelete(null);
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  };

  const openCreateChatModal = () => {
    setOpenDialog(true);
  };

  const closeCreateChatModal = () => {
    setOpenDialog(false);
    setNewChatName("");
  };

  const handleCreateChat = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/chats/", {
        name: newChatName,
      }, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("accessToken")}` }
      });
      setChatlist([...chatlist, response.data]);
      setSelectedChat(chatlist.length);
      closeCreateChatModal();
    } catch (error) {
      console.error("Failed to create chat:", error);
    }
  };

  return (
    <>
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
            {chatlist.length > 0 ? (
              chatlist.map((chat, index) => (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    backgroundColor:
                      index === selectedChat ? "#34393e" : "rgba(0,0,0,0)",
                    width: "90%",
                  }}
                  borderRadius={2}
                  key={chat.chat_id}
                >
                  <MenuItem
                    sx={{
                      backgroundColor: "rgba(0,0,0,0)",
                      width: "90%",
                      margin: "0 auto",
                      borderRadius: 1,
                    }}
                    onClick={() => setSelectedChat(index)}
                  >
                    <Typography mr={1} color="white">
                      {chat.name}
                    </Typography>
                    <ChatIcon sx={{ color: "#4A9E8F" }} />
                  </MenuItem>
                  <IconButton onClick={() => confirmDeleteChat(chat.chat_id)}>
                    <DeleteIcon sx={{ color: "#FF0000" }} />
                  </IconButton>
                </Stack>
              ))
            ) : (
              <Typography color="white" mt={2}>
                No chats started
              </Typography>
            )}
          </Stack>
          <Button
            variant="outlined"
            onClick={openCreateChatModal}
            sx={{ width: "90%", margin: "0 auto" }}
          >
            <Typography align="center" justifyContent="center">
              ADD CHAT
            </Typography>
            <AddIcon />
          </Button>
        </Stack>
      </Drawer>

      <Dialog open={openDialog} onClose={closeCreateChatModal}>
        <DialogTitle>Create a New Chat</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Chat Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newChatName}
            onChange={(e) => setNewChatName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCreateChatModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateChat} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog for Deletion */}
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this chat?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteChat} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
