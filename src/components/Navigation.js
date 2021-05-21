import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SearchForm from "./SearchForm";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    display: "none",
    textDecoration: "none",
    color: "black",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

const Navigation = () => {
  const classes = useStyles();

  return (
    <nav>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            component={Link}
            to="/"
          >
            My Movie Collection
          </Typography>
          <SearchForm />
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Navigation;
