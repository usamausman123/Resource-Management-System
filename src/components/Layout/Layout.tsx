import * as React from 'react';
import Sidenav from '../Sidenav/Sidenav';
import Header from '../Header/Header'
import Dashboard from '../Dashboard/Dashboard';
import Box from '@mui/material/Box';
import './Layout.css';

interface LayoutProps {}

const Layout = () => {
  const [open, setOpen] = React.useState(false);
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
  <>
    <Dashboard></Dashboard>
  </>
  )
}

export default Layout;
