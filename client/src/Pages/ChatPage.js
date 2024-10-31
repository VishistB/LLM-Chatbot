import React from 'react';
import { Stack, Box, TextField, IconButton, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function ChatPage() {
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
        //   backgroundColor: "#2A2D32",
        //   borderRadius: 2,
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                maxWidth: "70%",
                backgroundColor: "#3A3F45",
                padding: 1,
                borderRadius: 2,
                alignSelf: "flex-start",
              }}
            >
              Hello! How can I assist you today?
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                maxWidth: "70%",
                backgroundColor: "#4B4F57",
                padding: 1,
                borderRadius: 2,
                alignSelf: "flex-end",
              }}
            >
              I'd like to know more about your services.
            </Typography>
          </Box>

          {/* Additional Messages */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                maxWidth: "70%",
                backgroundColor: "#3A3F45",
                padding: 1,
                borderRadius: 2,
                alignSelf: "flex-start",
              }}
            >
              Sure! We offer a range of services to help you succeed.
            </Typography>
          </Box>
        </Box>

        {/* Input Area */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            // padding: 1,
            backgroundColor: "#1A1D20",
            // borderTop: "1px solid #333",
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
          <IconButton sx={{ marginLeft: 2, color:"#4A9E8F" }}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Stack>
  );
}
