import { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { getMovies } from "../services/movies";
import SearchForm from "../components/SearchForm";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Movie from "../components/Movie";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    marginTop: "2rem",
  },
  searchFormWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },
  noResults: {
    textAlign: "center",
    marginTop: "2rem",
  },
}));

const Search = ({ match }) => {
  const keyword = match.params.keyword;
  const [loading, setLoading] = useState(false);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [error, setError] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    retrieveMovies();
  }, [keyword]);

  const retrieveMovies = async () => {
    if (!keyword) return;
    setLoading(true);
    try {
      setLoading(false);
      const { data } = await getMovies(keyword);
      setSearchedMovies(data.map((x) => x.show));
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h3" className={classes.title}>Search</Typography>
      <div className={classes.searchFormWrapper}>
        <SearchForm />
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : searchedMovies.length === 0 && keyword ? (
        <Typography variant="h5" className={classes.noResults}>There is no movie with this title</Typography>
      ) : (
        searchedMovies.map((movie) => <Movie key={movie.id} movie={movie} />)
      )}
    </Container>
  );
};

export default Search;
