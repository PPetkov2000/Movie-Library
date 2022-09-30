import { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Rating from './Rating'
import { addNote } from '../services/notes'
import { getRating, addRating, updateRating } from '../services/ratings'
import useAsync from '../customHooks/useAsync'

const useStyles = makeStyles((theme) => ({
  reviewWrapper: {
    width: '50%',
    margin: theme.spacing(2, 0, 2, 0),
  },
  reviewTextField: {
    width: '100%',
  },
  submitButton: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
}))

const Review = ({ movie }) => {
  const getRatingResponse = useAsync(() => getRating(movie.id), [movie.id])
  const addRatingResponse = useAsync(addRating, [], false)
  const updateRatingResponse = useAsync(updateRating, [], false)
  const addNoteResponse = useAsync(addNote, [], false)
  const classes = useStyles()
  const [note, setNote] = useState('')
  const [rating, setRating] = useState(0)

  const submitHandler = (e) => {
    e.preventDefault()
    if (!note) return
    addNoteResponse.execute({ text: note, movieId: movie.id })
    setNote('')
  }

  const updateRatingHandler = (e) => {
    const ratingScore = Number(e.target.id || e.target.parentElement.id)
    setRating(ratingScore)
    if (rating) {
      updateRatingResponse.execute(movie.id, ratingScore)
    } else {
      addRatingResponse.execute({ movieId: movie.id, rating: ratingScore })
    }
  }

  useEffect(() => {
    setRating(getRatingResponse.data?.rating)
  }, [getRatingResponse.data?.rating])

  return (
    <div className={classes.reviewWrapper}>
      <Rating value={rating} text="Your Review" handleClick={updateRatingHandler} />
      <form onSubmit={submitHandler}>
        <TextField
          label="Notes"
          multiline
          rows={7}
          placeholder="Your private notes and comments about the movie..."
          variant="outlined"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className={classes.reviewTextField}
        />
        <div>
          <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={addNoteResponse.loading}>
            {addNoteResponse.loading ? 'Loading...' : 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Review
