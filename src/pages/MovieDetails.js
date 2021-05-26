import { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { useAuth } from "../contexts/AuthProvider";
import { getMovieById } from "../services/movies";
import Movie from "../components/Movie";
import Review from "../components/Review";

const MovieDetails = ({ match }) => {
  const movieId = Number(match.params.id);
  const { authUser } = useAuth();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    retrieveMovie(movieId);
  }, [movieId]);

  const retrieveMovie = async (id) => {
    const { data } = await getMovieById(id);
    setMovie(data);
  };

  return (
    <Container>
      <Movie movie={movie} />
      {authUser && <Review movie={movie} />}
    </Container>
  );
};

export default MovieDetails;
