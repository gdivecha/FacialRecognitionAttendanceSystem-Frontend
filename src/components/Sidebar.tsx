// Sidebar.tsx
import React, { useContext } from 'react';
import { Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { AuthContext } from '../firebase/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseSetup';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  PermContactCalendar as PermContactCalendarIcon,
  Book as BookIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  AccountBox as AccountBoxIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const tabToIconMap = [
  { tabName: 'Students', icon: <PermContactCalendarIcon /> },
  { tabName: 'Records', icon: <BookIcon /> },
  { tabName: 'Attendance', icon: <AssignmentTurnedInIcon /> },
  { tabName: 'Account Settings', icon: <AccountBoxIcon /> },
  { tabName: 'Sign Out', icon: <LogoutIcon /> }
];

const Sidebar = ({ open, handleDrawerClose }: { open: boolean; handleDrawerClose: () => void }) => {
  const theme = useTheme();
  const user = useContext(AuthContext);

  const signOut = async () => {
    await auth.signOut();
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {tabToIconMap.slice(0, 4).map((item) => (
          <ListItem key={item.tabName} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.tabName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {user ? (
          <ListItem key={tabToIconMap[4].tabName} disablePadding>
            <ListItemButton onClick={signOut}>
              <ListItemIcon>{tabToIconMap[4].icon}</ListItemIcon>
              <ListItemText primary={tabToIconMap[4].tabName} />
            </ListItemButton>
          </ListItem>
        ) : (
          <Navigate to={'/login'} />
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;