/*
- File Name: TopBar.js
- Author: shrouk ahmed
- Date of Creation: 17/9/2024
- Versions Information: 1.0.0
- Dependencies:
  {
  REACT , 
  MUI ,
  react-router-dom ,
  assests,
  }
- Contributors:
- Last Modified Date: 17/10/2024
- Description : project header
*/
import React, { useEffect, useState } from "react";
import {
  alpha,
  Box,
  Button,
  IconButton,
  InputBase,
  Stack,
  styled,
  Toolbar,
  useTheme,
  Menu,
  MenuItem,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MuiAppBar from "@mui/material/AppBar";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import logo from "../assests/devroots logo.png"; // Import your logo here
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Icon for dropdown menu
import HomeIcon from "@mui/icons-material/Home"; // Import icons for menu items
import StartIcon from "@mui/icons-material/Start"; // Example icon for "Start here"
import ServiceIcon from "@mui/icons-material/Assignment"; // Example icon for "Service"
import InfoIcon from "@mui/icons-material/Info"; // Example icon for "About us"
const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const TopBar = ({ open, handleDrawerOpen, setMode }) => {
  const navigate = useNavigate(); // Initialize navigate
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen is mobile
  const isIpad = useMediaQuery(theme.breakpoints.between("sm", "md")); // Check if the screen is iPad
  const isLandscape = useMediaQuery(theme.breakpoints.between("sm", "md")); // Check if the screen is iPad
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login status

  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };
  
  useEffect(() => {
    // Check if user is logged in (you can modify this logic based on your auth implementation)
    const user = localStorage.getItem("user"); // Example: get user info from local storage
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);
  const handleLogout = () => {
    // Implement logout logic here (e.g., remove user data from local storage)
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  const toggleTheme = () => {
    const newMode = theme.palette.mode === "light" ? "dark" : "light";
    localStorage.setItem("currentMode", newMode);
    setMode(newMode);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1), // Adjust margin for smaller screens
      width: "200px", // Width for larger screens
    },
    [theme.breakpoints.down("sm")]: {
      display: "none", // Hide on mobile screens
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%", // Full width for input
    },
  }));

  // Menu items for dropdown with icons
  const MenuItems = () => (
    <Box
      sx={{
        maxWidth: isIpad ? "none" : "none",
        display: "flex",
        flexDirection: isMobile || isIpad ? "column" : "row",
        padding: isMobile || isIpad ? "5px" : "5px",
        gap: isIpad ? "0px" : "5px", // Set gap between items based on device
        borderRadius: "8px", // Rounded corners for mobile only
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Shadow for mobile only
        backgroundColor: isMobile || isIpad ? "#f5f5f5" : "transparent",
      }}
    >
      {" "}
      <MenuItem onClick={handleMenuClose}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: isMobile || isIpad ? "#293241" : "white",
            display: "flex",
            alignItems: "center",
            fontWeight:"bold" 
          }}
        >
          <HomeIcon style={{ marginRight: "3px", fontSize: 13 }} />
          Home
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: isMobile || isIpad ? "#293241" : "white",
            display: "flex",
            alignItems: "center",
            fontWeight:"bold" 

          }}
        >
          <StartIcon style={{ marginRight: "3px", fontSize: 13 }} />
          Start here
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: isMobile || isIpad ? "#293241" : "white",
            display: "flex",
            alignItems: "center",
            fontWeight:"bold" 

          }}
        >
          <ServiceIcon style={{ marginRight: "3px", fontSize: 13 }} />
          Service
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: isMobile || isIpad ? "#293241" : "white",
            display: "flex",
            alignItems: "center",
            fontWeight:"bold" 

          }}
        >
          <InfoIcon style={{ marginRight: "3px", fontSize: 13 }} />
          About us
        </Link>
      </MenuItem>
    </Box>
  );

  return (
    <AppBar
      position="absolute"
      open={open}
      sx={{ zIndex: 0, backgroundColor: "#1d242f", width: "100%", left: 0 }}
    >
      <Toolbar sx={{ padding: isIpad || isLandscape ? "0" : "0" }}>
        {" "}
        {/* Conditional padding for iPad */}
        <img
          src={logo}
          alt="Logo"
          style={{ width: "150px", marginRight: "8px" }} // Reduced logo margin
        />
        <Box display="flex" justifyContent="center" flexGrow={1}>
          <Stack
            direction="row"
            spacing={0} // Set gap between items based on device
          >
            {" "}
            {/* Dropdown menu for mobile and iPad screens */}
            {isMobile || isIpad || isLandscape ? (
              <>
                <IconButton onClick={handleMenuClick} color="inherit">
                  <MoreVertIcon /> {/* Dropdown icon */}
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  sx={{ flexDirection: "row" }}
                >
                  <MenuItems /> {/* Render dropdown items */}
                </Menu>
              </>
            ) : (
              <Stack direction="row" spacing={1}>
                {" "}
                {/* Reduced spacing between items */}
                <MenuItems /> {/* Render menu items for desktop */}
              </Stack>
            )}
          </Stack>
        </Box>
        <Box flexGrow="" />
        {/* Search component - hidden on mobile */}
        <Box
          display={{ xs: "none", sm: "flex", md: "flex" }}
          alignItems="center"
        >
          <Search
            sx={{
              borderRadius: "25px",
              height: "30px",
              backgroundColor: "#F5F5F5",
              color: "#293241",
              width: isIpad ? "150px " : "150px !important", // Adjust width for iPad mode
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <IconButton onClick={toggleTheme} color="inherit">
            {theme.palette.mode === "light" ? (
              <LightModeOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon />
            )}
          </IconButton>
        </Box>
          

        {isLoggedIn ? (
          <IconButton onClick={handleLogout} color="inherit">
          <Avatar alt="User Avatar" src="/path/to/user/avatar.jpg" /> {/* Replace with actual avatar path */}
        </IconButton>
      ) : (
        <Stack direction="row" spacing={0}> 
          <Button
            type="submit"
            variant="contained"
            onClick={handleSignInClick}
            sx={{
              display: "flex",
              backgroundColor: "#293241",
              borderRadius: "15px 0 0 15px",
              width: "75px", // Reduced button width
              textTransform: "Capitalize",
              fontSize: "0.71rem", // Adjusted font size for smaller screens
            }}
          >
            Sign in
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSignUpClick}
            sx={{
              display: "flex",
              alignItems: "right",
              justifyContent: "center",
              backgroundColor: "#ee6f57",
              borderRadius: "0 15px 15px 0",
              width: "75px", // Reduced button width
              textTransform: "Capitalize",
              fontSize: "0.71rem", // Adjusted font size for smaller screens
            }}
          >
            Sign up
          </Button>
        </Stack>
        )}


      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
