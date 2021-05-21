import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "./Rating";

const useStyles = makeStyles((theme) => ({
  reviewWrapper: {
    marginTop: "2rem",
  },
  reviewTextField: {
    width: "50%",
  },
}));

const Review = () => {
  const [note, setNote] = useState("");
  const classes = useStyles();

  return (
    <div className={classes.reviewWrapper}>
      <Rating value="3.5" text="Your Review" />
      <TextField
        label="Notes"
        multiline
        rows={8}
        placeholder="Your private notes and comments about the movie..."
        variant="outlined"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className={classes.reviewTextField}
      />
    </div>
  );
};

export default Review;
