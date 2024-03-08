import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box, useTheme, useMediaQuery } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchBar from './SearchBar'; // Ensure this path is correct
import MoreIcon from '@mui/icons-material/MoreVert'; // For mobile menu
import Badge from '@mui/material/Badge';
import MailOutlinedIcon from '@mui/icons-material/MailOutline';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

const books = [
  { title: "The Great Gatsby", author: "Ernest Hemmingway" },
  { title: "Moby Dick", author: "J.K. Tolkien" },
  // Add more books or fetch from an API
];

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMobileMenuOpen = (event) =>
    setMobileMoreAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
    >
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleClose}>My Account</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="primary-search-account-menu-mobile"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(mobileMoreAnchorEl)}
      onClose={handleClose}
    >
      <MenuItem>
        <IconButton size="large" color="primary">
          <Badge badgeContent={4} color="secondary">
            <MailOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={11} color="error">
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ backgroundColor: "background.default", width: "100vw" }}>
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: "1150px",
          mx: "auto",
          backgroundColor: "background.default",
        }}
      >
        <AppBar
          position="static"
          sx={{ boxShadow: "none", backgroundColor: "background.default" }}
        >
          <Toolbar
            sx={{
              backgroundColor: "background.default",
              justifyItems: "center",
            }}
          >
            <Typography
              variant="h2"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" }, pl: 1, pr: 2 }}
              fontWeight={"bold"}
              color={"text.secondary"}
            >
              BookHaven
            </Typography>
            <Box sx={{ flexGrow: 1, px: 4, ml: 2 }}>
              <SearchBar suggestions={[...books]} />
            </Box>
            <Box sx={{px: 2}}>
              <Link
                to="#"
                style={{ textDecoration: "none" }}
                color="primary.main"
                rel="noopener follow"
              >
                <Typography variant="h4" color="primary">
                  Sign In
                </Typography>
              </Link>
            </Box>

            <IconButton sx={{ px: 2 }} color="primary">
              <ShoppingCartIcon fontSize="large" />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="primary"
              sx={{ px: 2 }}
            >
              <AccountCircle fontSize="large" />
            </IconButton>
            {isMobile && (
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls="primary-search-account-menu-mobile"
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="primary.main"
              >
                <MoreIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </Box>
  );
};

export default Navbar;
