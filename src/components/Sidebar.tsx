// Sidebar.tsx
import { useContext } from 'react';
import { Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { AuthContext } from '../firebase/context/AuthContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseSetup';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { tabToIconMap } from '../configurations/SidebarConfigs';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Sidebar = ({ open, handleDrawerClose }: { open: boolean; handleDrawerClose: () => void }) => {
  const theme = useTheme();
  const user = useContext(AuthContext);
  const navigate = useNavigate()
  const location = useLocation();

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
        {tabToIconMap.map((item) => (
          <ListItem key={item.tabName} disablePadding>
            <ListItemButton
                onClick={() => navigate(item.pageExtension)}
                selected={location.pathname === item.pageExtension} // Highlight if current path matches
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.tabName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {user ? (
          <ListItem key={'Sign Out'} disablePadding>
            <ListItemButton onClick={signOut}>
              <ListItemIcon>{<LogoutIcon/>}</ListItemIcon>
              <ListItemText primary={'Sign Out'} />
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