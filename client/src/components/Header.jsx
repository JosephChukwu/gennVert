import React, { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {
  Grid,
  IconButton,
  ListItem,
  List,
  ListItemText,
  Drawer,
  Typography,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import GennvertLogo from "../assets/GennvertLogo.png";

const Header = () => {
  const [Value, setValue] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleIconClick = () => {
    toggleDrawer(true)();
  };

  return (
    <header>
      <AppBar
        position="fixed"
        style={{ backgroundColor: "#5c58ff" }}
      >
        <Box>
          <Toolbar>
            {/* {isMobile ? (  */}
            <Grid
              container
              sx={{
                display: { xs: "flex", sm: "flex", md: "none" },
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                height: "12vh",
              }}
            >
              <Link to="/" style={{ textDecoration: "none", color: "#46c4bd" }}>
                <img src={GennvertLogo} alt="logo" />
              </Link>

              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleIconClick}
                sx={{ color: "#46c4bd", marginLeft: "auto" }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                <List>
                  <ListItem button component={Link} to="/about">
                    <ListItemText primary="About" />
                  </ListItem>

                  <ListItem button component={Link} to="/contact">
                    <ListItemText primary="Contact" />
                  </ListItem>

                  <ListItem button component={Link} to="/sign-up">
                    <ListItemText primary="Sign Up" />
                  </ListItem>
                </List>
              </Drawer>
            </Grid>
            {/*  ) : (   */}

            <>
              <Grid
                container
                alignItems="center"
                sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
              >
                <Grid
                  item
                  xs={2}
                  sx={{
                    color: "#46c4bd",
                    textAlign: "center",
                    textDecorationLine: "none",
                  }}
                  component={Link}
                  to="/"
                >
                <img src={GennvertLogo} alt="logo" />
                </Grid>

                <Grid item xs={5} sx={{ marginLeft: "auto", color: "#46c4bd" }}>
                  <Tabs
                    value={Value}
                    textColor="inherit"
                    onChange={(e, val) => setValue(val)}
                  >
                    <Tab label="About" component={Link} to="/about" />
                    <Tab label="Contact" component={Link} to="/contact" />
                    <Tab label="sign up" component={Link} to="/sign-up" />
                  </Tabs>
                </Grid>
              </Grid>
            </>

            {/* )} */}
          </Toolbar>
        </Box>
      </AppBar>
    </header>
  );
};

export default Header;
