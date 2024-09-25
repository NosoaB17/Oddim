import React from "react";
import { Box, Grid } from "@mui/material";
import ConversationSidebar from "../components/Conversation/SideBar/ConversationSidebar";

const MessageArea = () => <Box>Message Area</Box>;

const ConversationPage = () => {
  return (
    <Box sx={{ flexGrow: 1, height: "100vh", overflow: "hidden" }}>
      <Grid container sx={{ height: "100%" }}>
        {/* Conversation Sidebar */}
        <Grid item xs={3} sx={{ borderRight: 1, borderColor: "divider" }}>
          <ConversationSidebar />
        </Grid>

        {/* Message Area */}
        <Grid item xs={9}>
          <MessageArea />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConversationPage;
