import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  wrapper: {
    marginTop: "2rem",
    bottom: "0",
  },
  text: {
    width: "100%",
    textAlign: "center",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.wrapper}>
      <AppBar position="static" color="default">
        <Container>
          <Toolbar>
            <Typography variant="body1" color="inherit" className={classes.text}>© Plamen Petkov 2021</Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </footer>
  );
};

export default Footer;
