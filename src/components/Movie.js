import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Message from '../components/Message'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth } from '../contexts/AuthProvider'
import { addToFavorites, removeFromFavorites } from '../services/favorites'
import { defaultImage } from '../utils/defaultImage'
import { removeHtmlTags } from '../utils/stringUtils'
import useAsync from '../customHooks/useAsync'

const useStyles = makeStyles(() => ({
  movieWrapper: {
    display: 'grid',
    gridTemplateColumns: 'min-content 1fr',
    columnGap: '2rem',
    marginTop: '2rem',
  },
  movieImage: {
    maxWidth: '210px',
  },
  movieInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  movieAddButton: {
    color: 'green',
    borderColor: 'green',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  movieRemoveButton: {
    color: 'red',
    borderColor: 'red',
    fontWeight: 'bold',
    marginTop: '10px',
  },
}))

const Movie = ({ movie }) => {
  const classes = useStyles()
  const { authUser, updateAuthUser } = useAuth()
  const addToFavoritesResponse = useAsync(() => addToFavorites(movie).then(({ data }) => updateAuthUser(data)), [movie], false)
  const removeFromFavoritesResponse = useAsync(() => removeFromFavorites(movie?.id).then(({ data }) => updateAuthUser(data)), [movie?.id], false)
  const isMovieInFavorites = Boolean(authUser?.favoriteMovies?.find((m) => m.id === movie?.id))

  if (!movie) return null

  return (
    <div className={classes.movieWrapper}>
      <Link to={`/movie/${movie.id}`} aria-label="See movie details">
        <img src={movie.image ? movie.image.medium : defaultImage} alt={movie.name} className={classes.movieImage} loading="lazy" />
      </Link>
      <div className={classes.movieInfo}>
        <Typography variant="h3">
          {movie.name} {movie.premiered} {movie.premiered && movie.premiered.split('-')[0]}
        </Typography>
        {movie.genres && movie.genres.length > 0 && (
          <Typography variant="h5">
            {movie.genres.slice(0, 3).join(', ')} | {movie.runtime} minutes
          </Typography>
        )}
        <Typography variant="subtitle1">{removeHtmlTags(movie.summary)}</Typography>
        <div>
          <a href="https://www.tvmaze.com" target="_blank" rel="noreferrer" style={{ fontSize: '1.1rem' }}>
            Visit official site
          </a>
        </div>
        <div>
          {isMovieInFavorites ? (
            <Button
              variant="outlined"
              className={classes.movieRemoveButton}
              onClick={removeFromFavoritesResponse.execute}
              disabled={removeFromFavoritesResponse.loading}
            >
              {removeFromFavoritesResponse.loading ? 'Loading...' : 'Remove From Favorites'}
            </Button>
          ) : (
            <Button
              variant="outlined"
              className={classes.movieAddButton}
              onClick={addToFavoritesResponse.execute}
              disabled={addToFavoritesResponse.loading}
            >
              {addToFavoritesResponse.loading ? 'Loading...' : 'Add To Favorites'}
            </Button>
          )}
        </div>
        {addToFavoritesResponse.error && <Message variant="error">{addToFavoritesResponse.error}</Message>}
        {removeFromFavoritesResponse.error && <Message variant="error">{removeFromFavoritesResponse.error}</Message>}
      </div>
    </div>
  )
}

export default Movie
