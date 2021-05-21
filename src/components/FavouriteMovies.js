import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import useFetch from "../hooks/useFetch";
import Loader from "./Loader";
import Message from "./Message";

const useStyles = makeStyles(() => ({
  moviesWrapper: {
    // display: "grid",
    // gridTemplateColumns: repeat("auto-fill", minmax("200px", "1fr")),
  },
}));

const FavouriteMovies = () => {
  const classes = useStyles();
  const {
    loading,
    data: movies,
    error,
  } = useFetch("https://api.tvmaze.com/shows");
  console.log(movies);

  return (
    <Container>
      <h2>FavouriteMovies</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : movies.length > 0 ? (
        <div className={classes.moviesWrapper}>
          {movies.map((movie) => (
            <img
              key={movie.id}
              src={movie.image && movie.image.medium}
              alt={movie.name}
            />
          ))}
        </div>
      ) : (
        <h2>You dont have favorite movies yet.</h2>
      )}
    </Container>
  );
};

export default FavouriteMovies;
