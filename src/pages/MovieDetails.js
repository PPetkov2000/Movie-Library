import Container from "@material-ui/core/Container";
import { useAuth } from "../contexts/AuthProvider";
import Movie from "../components/Movie";
import Review from "../components/Review";

const MovieDetails = ({ location }) => {
  const movie = location.state;
  const { authUser } = useAuth();

  return (
    <Container>
      <Movie movie={movie} />
      {authUser && <Review movie={movie} />}
    </Container>
  );
};

export default MovieDetails;
