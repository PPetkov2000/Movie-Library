import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../contexts/AuthProvider";
import { addToFavorites, removeFromFavorites } from "../services/favorites";

const useStyles = makeStyles(() => ({
  movieWrapper: {
    display: "grid",
    gridTemplateColumns: "min-content 1fr",
    columnGap: "2rem",
    marginTop: "2rem",
  },
  movieImage: {
    // width: clamp("200px, 100%, 280px"),
  },
  movieInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  movieAddButton: {
    color: "green",
    borderColor: "green",
    fontWeight: "bold",
  },
  movieRemoveButton: {
    color: "red",
    borderColor: "red",
    fontWeight: "bold",
  },
}));

const Movie = ({ movie }) => {
  const classes = useStyles();
  const { authUser, updateAuthUser } = useAuth();

  function removeHtmlTags(str) {
    const div = document.createElement("div");
    div.innerHTML = str;
    return div.textContent || "";
  }

  return (
    <div className={classes.movieWrapper}>
      <Link to={{ pathname: `/movie/${movie.name}`, state: movie }}>
        <img
          src={movie.image && movie.image.medium}
          alt={movie.name}
          className={classes.movieImage}
        />
      </Link>
      <div className={classes.movieInfo}>
        <Typography variant="h3">
          {movie.name}{" "}
          {movie.premiered && (
            <>({movie.premiered && movie.premiered.split("-")[0]})</>
          )}
        </Typography>
        {movie.genres.length > 0 && (
          <Typography variant="h5">
            {movie.genres.slice(0, 3).join(", ")} | {movie.runtime} minutes
          </Typography>
        )}
        <Typography variant="subtitle1">
          {removeHtmlTags(movie.summary)}
        </Typography>
        <div>
          <a
            href="https://www.tvmaze.com"
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: "1.1rem" }}
          >
            Visit official site
          </a>
        </div>
        <div>
          {authUser &&
          authUser.favoriteMovies &&
          authUser.favoriteMovies.find((x) => x.id === movie.id) ? (
            <Button
              variant="outlined"
              className={classes.movieRemoveButton}
              onClick={async () => {
                const { data } = await removeFromFavorites(movie.id);
                updateAuthUser(data);
              }}
            >
              Remove From Favorites
            </Button>
          ) : (
            <Button
              variant="outlined"
              className={classes.movieAddButton}
              onClick={async () => {
                const { data } = await addToFavorites(movie);
                updateAuthUser(data);
              }}
            >
              Add To Favorites
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movie;
