import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { getMovies } from '../services/movies'
import SearchForm from '../components/SearchForm'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Movie from '../components/Movie'
import useAsync from '../customHooks/useAsync'

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    marginTop: '2rem',
  },
  searchFormWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  noResults: {
    textAlign: 'center',
    marginTop: '2rem',
  },
}))

const Search = ({ match }) => {
  const keyword = match.params.keyword || ''
  const classes = useStyles()
  const { loading, error, data: movies } = useAsync(() => getMovies(keyword), [keyword])

  return (
    <Container>
      <Typography variant="h3" className={classes.title}>
        Search
      </Typography>
      <div className={classes.searchFormWrapper}>
        <SearchForm />
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : movies?.length === 0 && keyword ? (
        <Typography variant="h5" className={classes.noResults}>
          There is no movie with this title
        </Typography>
      ) : (
        movies?.map((movie) => <Movie key={movie.show?.id} movie={movie.show} />)
      )}
    </Container>
  )
}

export default Search
