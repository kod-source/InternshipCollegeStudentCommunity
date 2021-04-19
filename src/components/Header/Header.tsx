import React, { useCallback, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { auth } from "../../firebase";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    menuBar: {
        backgroundColor: "#fff",
        color: "#444",
    },
    title: {
      flexGrow: 1,
    },
    toolBar: {
        margin: "0 auto",
        maxWidth: 1250,
        width: "100%",
    },
  })
);

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            CodyMuty
          </Typography>
          <Button color="inherit" onClick={async () => await auth.signOut()}>
            ログアウト
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
