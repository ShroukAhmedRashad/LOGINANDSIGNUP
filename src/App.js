/*
- File Name:App.js
- Author: shrouk ahmed
- Date of Creation: 17/9/2024
- Versions Information: 1.0.0
- Dependencies:
  {
  REACT , 
  MUI ,
  Themes,
  react-router-dom ,
  }
- Contributors:
- Last Modified Date: 17/10/2024
- Description : file to rendering project
*/
// src/App.js

import React from "react";
import TopBar from "./components/TopBar";

import { createTheme } from "@mui/material/styles";
import "./App.css";
import { Outlet } from "react-router-dom";
import { getDesignTokens } from "Themes";
import { Box } from "@mui/material";

function App() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const [mode, setMode] = React.useState(
    localStorage.getItem("currentMode") || "light"
  );
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <div>
      {/* The TopBar will be visible on all pages */}

      <TopBar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        setMode={setMode}
      />

      <Box sx={{ mt: "64px" }}>
        <Outlet />
      </Box>
    </div>
  );
}
export default App;
