import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../contexts/AuthProvider";
import SearchForm from "./SearchForm";

const useStyles = makeStyles((theme) => ({
  navbarWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  navbarTitle: {
    display: "none",
    textDecoration: "none",
    color: "black",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      width: "fit-content",
    },
  },
  navbarButton: {
    fontWeight: "bold",
  },
}));

const Navigation = () => {
  const classes = useStyles();
  const { authUser, logout } = useAuth();

  return (
    <nav>
      <AppBar position="static" color="default">
        <Toolbar className={classes.navbarWrapper}>
          <div>
            <Typography className={classes.navbarTitle} variant="h6" noWrap component={Link} to="/">My Movie Collection</Typography>
          </div>
          <SearchForm />
          <div>
            {authUser ? (
              <>
                <Button className={classes.navbarButton}>{authUser.username}</Button>
                <Button onClick={logout} className={classes.navbarButton}>Logout</Button>
              </>
            ) : (
              <>
                <Button component={Link} className={classes.navbarButton} to="/login">Login</Button>
                <Button component={Link} className={classes.navbarButton} to="/register">Sign Up</Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Navigation;
