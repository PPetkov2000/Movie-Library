import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "./Loader";
import Message from "./Message";
import { defaultImage } from "../utils/defaultImage";
import { useAuth } from "../contexts/AuthProvider";

const useStyles = makeStyles(() => ({
  moviesWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    columnGap: "1rem",
    rowGap: "1rem",
  },
  moviesTitle: {
    textAlign: "center",
    marginTop: "2rem",
    marginBottom: "1.5rem",
  },
  moviesEmpty: {
    textAlign: "center",
  },
}));

const FavouriteMovies = () => {
  const classes = useStyles();
  const { loading, authUser, error } = useAuth();

  return (
    <Container>
      <Typography variant="h4" className={classes.moviesTitle}>
        Your Favorites
      </Typography>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : authUser && authUser.favoriteMovies.length > 0 ? (
        <div className={classes.moviesWrapper}>
          {authUser.favoriteMovies.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <img
                src={movie.image ? movie.image.medium : defaultImage}
                alt={movie.name}
              />
            </Link>
          ))}
        </div>
      ) : (
        <Typography
          variant="h5"
          color="primary"
          className={classes.moviesEmpty}
        >
          You dont have favorite movies yet.
        </Typography>
      )}
    </Container>
  );
};

export default FavouriteMovies;
