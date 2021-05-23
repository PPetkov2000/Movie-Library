import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "./Rating";
import { addNote } from "../services/notes";

const useStyles = makeStyles((theme) => ({
  reviewWrapper: {
    marginTop: "2rem",
    marginBottom: "2rem",
  },
  reviewTextField: {
    width: "50%",
  },
  submitButton: {
    width: "50%",
    marginTop: "0.5rem",
  },
}));

const Review = ({ movie }) => {
  const [note, setNote] = useState("");
  const [rating, setRating] = useState("2.5");
  const classes = useStyles();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!note) return;
    await addNote({ text: note, movieId: movie.id });
    setNote("");
  };

  return (
    <div className={classes.reviewWrapper}>
      <Rating value={rating} text="Your Review" />
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitButton}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Review;
