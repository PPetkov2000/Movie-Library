import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "./Rating";
import { addNote } from "../services/notes";
import { getRating, addRating, updateRating } from "../services/ratings";

const useStyles = makeStyles((theme) => ({
  reviewWrapper: {
    width: "50%",
    margin: theme.spacing(2, 0, 2, 0),
  },
  reviewTextField: {
    width: "100%",
  },
  submitButton: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
}));

const Review = ({ movie }) => {
  const [note, setNote] = useState("");
  const [rating, setRating] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    if (!movie.id) return;
    retrieveRating();
  }, [rating, movie]);

  const retrieveRating = async () => {
    const { data } = await getRating(movie.id);
    if (data) {
      setRating(data.rating);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!note) return;
    await addNote({ text: note, movieId: movie.id });
    setNote("");
  };

  const ratingHandler = async (e) => {
    const ratingScore = Number(e.target.id || e.target.parentElement.id);
    if (rating) {
      await updateRating(movie.id, ratingScore);
    } else {
      await addRating({ rating: ratingScore, movieId: movie.id });
    }
    setRating(ratingScore);
  };

  return (
    <div className={classes.reviewWrapper}>
      <Rating value={rating} text="Your Review" handleClick={ratingHandler} />
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
          <Button type="submit" variant="contained" color="primary" className={classes.submitButton}>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default Review;
