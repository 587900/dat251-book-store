import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchBar from "./SearchBar"; // Ensure this path is correct
import MoreIcon from "@mui/icons-material/MoreVert"; // For mobile menu
import Badge from "@mui/material/Badge";
import MailOutlinedIcon from "@mui/icons-material/MailOutline";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import Logo from "../assets/logo/Logo1.png";
import LogoIcon from "../assets/logo/Logo1_Icon_Only.png"
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

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const currentUser = true;

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    return;
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
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
      <Link to="/profile" color="inherit">
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>

      {currentUser !== null ? (
        <Box>
          <Link to="/">
            <MenuItem onClick={handleLogout}>
              <Typography
                rel="noopener follow"
                onClick={handleLogout}
                color="inherit"
              >
                Logout
              </Typography>
            </MenuItem>
          </Link>

          <MenuItem>
            <Typography variant="subtitle2">
              {currentUser?.displayName}
            </Typography>
          </MenuItem>
        </Box>
      ) : (
        <Link to="/login" rel="noopener follow" color="inherit">
          <MenuItem>Login</MenuItem>
        </Link>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton size="large" color="primary">
          <ShoppingCartIcon fontSize="large" />
        </IconButton>
        <Typography color="primary">Cart</Typography>
      </MenuItem>
      <Link to="/profile" color="inherit">
        <MenuItem onClick={handleMobileMenuClose}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="false"
            color="primary"
          >
            <AccountCircle />
          </IconButton>
          <Typography color="primary">Profile</Typography>
        </MenuItem>
      </Link>
      {currentUser !== null ? (
        <Box>
          <Link to="/">
            <MenuItem onClick={handleLogout}>
              <IconButton size="large" aria-label="logout" color="primary">
                <LogoutIcon />
              </IconButton>
              <Typography
                rel="noopener follow"
                onClick={handleLogout}
                color="primary"
              >
                Sign out
              </Typography>
            </MenuItem>
          </Link>
        </Box>
      ) : (
        <Link to="/login" rel="noopener follow" color="inherit">
          <MenuItem onClick={handleMobileMenuClose}>
            <IconButton size="large" aria-label="login" color="inherit">
              <LoginIcon />
            </IconButton>

            <span>Sign in</span>
          </MenuItem>
        </Link>
      )}
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
            {isMobile ? (
              <>
                <Link to="/" sx={{ color: "#fff", backgroundColor: "inherit" }}>
                  <img
                    src={LogoIcon}
                    className="d-sm-block me-3 logo"
                    alt="Logo The Book Club Icon Only"
                    style={{ width: "45px", height: "45px" }}
                  />
                </Link>
                <Box sx={{ flexGrow: 1, px: 1, ml: 2 }}>
                  <SearchBar suggestions={[...books]} />
                </Box>
              </>
            ) : (
              <>
                <Link to="/" sx={{ color: "#fff", backgroundColor: "inherit" }}>
                  <img
                    src={Logo}
                    className="d-sm-block me-3 logo"
                    alt="Logo The Book Club"
                    style={{ width: "172px", height: "40px" }}
                  />
                </Link>
                <Box sx={{ flexGrow: 1, px: 5, ml: 2 }}>
                  <SearchBar suggestions={[...books]} />
                </Box>
              </>
            )}
            {/*#######################################################################*/}
            {/*MORE ICON*/}
            {/*#######################################################################*/}
            {isMobile ? (
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="secondary"
              >
                <MoreIcon />
              </IconButton>
            ) : (
              <>
                <Box sx={{ px: 2 }}>
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
              </>
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
