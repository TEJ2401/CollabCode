import React, { useState } from 'react';
import { FaFile, FaUser, FaComments } from 'react-icons/fa';
import FolderIcon from '@mui/icons-material/Folder';
import GroupIcon from '@mui/icons-material/Group';
import ChatIcon from '@mui/icons-material/Chat';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('files'); // State to track active tab

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="sidebar">
            <List>
                {/* File Section */}
                <ListItem button>
                    <ListItemAvatar>
                        <Avatar>
                            <FolderIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Files" />
                </ListItem>
                {/* Connected Users */}
                <ListItem button>
                    <ListItemAvatar>
                        <Avatar>
                            <GroupIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Connected" />
                </ListItem>
                {/* Chatbox */}
                <ListItem button>
                    <ListItemAvatar>
                        <Avatar>
                            <ChatIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Chat" />
                </ListItem>
            </List>
        </div>
  );
};

export default Sidebar;
