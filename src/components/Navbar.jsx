import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const menuItems = ['Home', 'Timeline', 'Sponsors', 'Problem Statement', 'FAQs'];

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      {/* Floating Navbar */}
      <AppBar
        position="fixed"
        sx={{
          top: 20, // Distance from top
          left: '50%', // Center align
          transform: 'translateX(-50%)', // Center correction
          backgroundColor: 'rgba(0, 0, 0, 0.8)', // Transparent effect
          backdropFilter: 'blur(10px)', // Glass effect
          borderRadius: '50px', // Rounded edges
          padding: '0px 5px',
          width: 'fit-content', // Adjust width based on content
          boxShadow: '0px 4px 10px rgba(0,0,0,0.2)', // Soft shadow
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
          {/* Center Navigation Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {menuItems.map((item) => (
              <Button
                key={item}
                sx={{
                  color: '#fff',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
                  transition: '0.3s',
                  '&:hover': { color: '#f39c12' },
                }}
              >
                {item}
              </Button>
            ))}
          </Box>

          {/* Mobile Menu */}
          <Button
            sx={{ display: { md: 'none', xs: 'block' }, color: '#fff', minWidth: 'auto' }}
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </Button>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="top" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box sx={{ width: '100%', textAlign: 'center', padding: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item} onClick={() => setOpenDrawer(false)}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
