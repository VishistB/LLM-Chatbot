import React, { useState, useEffect, createContext, useContext } from "react";
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
  Box,
  CircularProgress,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Logo from "../Assets/Mimir_Logo.png";
import ChatIcon from "@mui/icons-material/Chat";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

export const MessagesContext = createContext();

export default function SideBar({ setMessages, setSelectedChatId }) {
  const [chatlist, setChatlist] = useState([]);
  const [selectedChat, setSelectedChat] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [newChatName, setNewChatName] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);
  const [isLoadingChats, setIsLoadingChats] = useState(true);

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (chatlist.length > 0) {
      handleChatSelect(chatlist[0].chat_id);
      setSelectedChat(chatlist[0].chat_id);
    }
  }, [chatlist]);

  const fetchChats = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/chats/", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      // const sortedChats = response.data.sort(
      //   (a, b) => new Date(b.modified_at) - new Date(a.modified_at)
      // );

      setChatlist(response.data);

      if (response.data.length > 0) {
        const latestChatId = response.data[0].chat_id;
        setSelectedChat(latestChatId);
        setSelectedChatId(latestChatId);
        handleChatSelect(latestChatId);
      }
      setIsLoadingChats(false);
    } catch (error) {
      console.error("Failed to load chats:", error);
    }
  };

  const handleChatSelect = async (chat_id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/chats/${chat_id}/messages/`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );

      const messagesWithSender = response.data.map((message) => ({
        sender: message.sender,
        content: message.content,
      }));

      setMessages(messagesWithSender);
      setSelectedChat(chat_id);
      setSelectedChatId(chat_id);
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  };

  const confirmDeleteChat = (chat_id) => {
    setChatToDelete(chat_id);
    setConfirmDialogOpen(true);
  };

  const handleDeleteChat = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/chats/${chatToDelete}/delete_chat/`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      setChatlist(chatlist.filter((chat) => chat.chat_id !== chatToDelete));
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
      const response = await axios.post(
        "http://localhost:8000/api/chats/",
        { name: newChatName },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );

      const newChat = response.data;
      setChatlist([newChat, ...chatlist]);
      setSelectedChat(newChat.chat_id);
      setSelectedChatId(newChat.chat_id);
      handleChatSelect(newChat.chat_id);
      closeCreateChatModal();
    } catch (error) {
      console.error("Failed to create chat:", error);
    }
  };

  return (
    <MessagesContext.Provider value={setMessages}>
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
              chatlist.map((chat) => (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    backgroundColor:
                      chat.chat_id === selectedChat
                        ? "#34393e"
                        : "rgba(0,0,0,0)",
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
                    onClick={() => handleChatSelect(chat.chat_id)}
                  >
                    <ChatIcon sx={{ color: "#4A9E8F" }} />
                    <Typography ml={1} color="white">
                      {chat.name}
                    </Typography>
                  </MenuItem>
                  <IconButton onClick={() => confirmDeleteChat(chat.chat_id)}>
                    <DeleteIcon sx={{ color: "#FF0000" }} />
                  </IconButton>
                </Stack>
              ))
            ) : !isLoadingChats ? (
              <Typography color="white" mt={2}>
                No chats started
              </Typography>
            ) : (
              <>
                <Typography color="white" mt={2}>
                  Loading chats
                </Typography>
                <CircularProgress />
              </>
            )}
          </Stack>
          <Stack my={2} alignItems="center">
            <Button
              variant="outlined"
              onClick={openCreateChatModal}
              sx={{
                width: "90%",
                margin: "0 auto",
                borderColor: "#4A9E8F",
                color: "#4A9E8F",
              }}
            >
              <Typography align="center" justifyContent="center">
                ADD CHAT
              </Typography>
              <AddIcon />
            </Button>
          </Stack>
        </Stack>
      </Drawer>

      <Dialog open={openDialog} onClose={closeCreateChatModal}>
        <DialogTitle sx={{ backgroundColor: "#23262a", color: "white" }}>
          Create a New Chat
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#23262a" }}>
          <TextField
            autoFocus
            margin="dense"
            label="Chat Name"
            placeholder="Chat Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newChatName}
            onChange={(e) => setNewChatName(e.target.value)}
            sx={{
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#4A9E8F",
                  color: "white",
                },
                "&:hover fieldset": {
                  borderColor: "#4A9E8F",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#4A9E8E",
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#23262a" }}>
          <Button onClick={closeCreateChatModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateChat} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle sx={{ backgroundColor: "#23262a", color: "white" }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#23262a", color: "white" }}>
          <Typography>Are you sure you want to delete this chat?</Typography>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#23262a" }}>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteChat} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </MessagesContext.Provider>
  );
}
