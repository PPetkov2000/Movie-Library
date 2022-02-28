import { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: "100%",
    display: "flex",
    alignItem: "center",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 2),
    borderRadius: "0.2rem",
    marginRight: "0.5rem",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20rem",
    },
    border: "1px solid lightgray",
  },
  searchButton: {
    color: "green",
    borderColor: "green",
  },
}));

const SearchForm = () => {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();
  const classes = useStyles();

  const searchHandler = (e) => {
    e.preventDefault();
    history.push(`/search/${keyword}`);
    setKeyword("");
  };

  return (
    <form className={classes.search} onSubmit={searchHandler}>
      <InputBase
        placeholder="Search by movie title…"
        classes={{ root: classes.inputRoot, input: classes.inputInput }}
        inputProps={{ "aria-label": "search" }}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button type="submit" variant="outlined" className={classes.searchButton}>Search</Button>
    </form>
  );
};

export default SearchForm;
