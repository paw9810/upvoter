import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/authContext";

const useStyles = makeStyles({
  margin: {
    marginBottom: "25px",
  },
  links: {
    textDecoration: "none",
    color: "inherit",
  },
});

const Header = ({ location }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [menuState, setMenuState] = useState(false);
  const classes = useStyles();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMenuState(open);
  };

  return (
    <Box className={classes.margin} component="header">
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            onClick={toggleDrawer(true)}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Drawer onClose={toggleDrawer(false)} anchor="left" open={menuState}>
            <List>
              <div
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <Link to="/" className={classes.links}>
                  <ListItem button>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                </Link>
                {!isAuthenticated && (
                  <Link to="/signin" className={classes.links}>
                    <ListItem button>
                      <ListItemIcon>
                        <VpnKeyIcon />
                      </ListItemIcon>
                      <ListItemText primary="Login" />
                    </ListItem>
                  </Link>
                )}
                {!isAuthenticated && (
                  <Link to="/signup" className={classes.links}>
                    <ListItem button>
                      <ListItemIcon>
                        <VpnKeyIcon />
                      </ListItemIcon>
                      <ListItemText primary="Register" />
                    </ListItem>
                  </Link>
                )}
                {isAuthenticated && (
                  <Link to={`/user/${user}`} className={classes.links}>
                    <ListItem button>
                      <ListItemIcon>
                        <AccountCircleIcon />
                      </ListItemIcon>
                      <ListItemText primary="Profile" />
                    </ListItem>
                  </Link>
                )}
                {isAuthenticated && (
                  <Link to="/" className={classes.links}>
                    <ListItem button>
                      <ListItemIcon>
                        <AddCircleIcon />
                      </ListItemIcon>
                      <ListItemText primary="Add post" />
                    </ListItem>
                  </Link>
                )}
                {isAuthenticated && (
                  <Link to="/" className={classes.links}>
                    <ListItem button>
                      <ListItemIcon>
                        <ExitToAppIcon />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </Link>
                )}
              </div>
            </List>
          </Drawer>
          <Typography variant="h6">{location}</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
