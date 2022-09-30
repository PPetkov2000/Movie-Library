import Container from '@material-ui/core/Container'
import { useAuth } from '../contexts/AuthProvider'
import { getMovieById } from '../services/movies'
import Movie from '../components/Movie'
import Review from '../components/Review'
import Message from '../components/Message'
import Loader from '../components/Loader'
import useAsync from '../customHooks/useAsync'

const MovieDetails = ({ match }) => {
  const movieId = Number(match.params.id)
  const { authUser } = useAuth()
  const { loading, error, data: movie } = useAsync(() => getMovieById(movieId), [movieId])

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <>
          <Movie movie={movie} />
          {authUser && movie && <Review movie={movie} />}
        </>
      )}
    </Container>
  )
}

export default MovieDetails
