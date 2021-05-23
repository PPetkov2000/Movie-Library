import Container from "@material-ui/core/Container";
import Movie from "../components/Movie";
import Review from "../components/Review";

const MovieDetails = ({ location }) => {
  const movie = location.state;

  return (
    <Container>
      <Movie movie={movie} />
      <Review movie={movie} />
    </Container>
  );
};

export default MovieDetails;
