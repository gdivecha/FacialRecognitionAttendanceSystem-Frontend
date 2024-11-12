// Home.tsx
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, CssBaseline, Toolbar, Typography, IconButton } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../../components/Sidebar';
import { Pages } from '../../configurations/HomeConfigs';
import Students from './students/Students';
import Records from './records/Records';
import Attendance from './attendance/Attendance';

interface HomeProps {
    page: Pages;
}

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


export default function Home(props: HomeProps) {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

    function logPageName() {
        console.log(props.page);
    }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            A.I.Tend
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
      <Main open={open}>
        <Toolbar />
        {props.page === Pages.STUDENTS ? <Students />
            : props.page === Pages.RECORDS ? <Records /> 
            : <Attendance /> 
        }
        {/* {props.page === Pages.STUDENTS && <Students />}
        {props.page === Pages.RECORDS && <Records />}
        {props.page === Pages.ATTENDANCE && <Attendance />} */}
      </Main>
    </Box>
  );
}
