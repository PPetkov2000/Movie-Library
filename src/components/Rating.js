import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  ratingWrapper: {
    margin: "1rem 0",
  },
  ratingText: {
    fontSize: "2rem",
    fontWeight: "bold",
    paddingLeft: ".7rem",
  },
  ratingIcon: {
    color: "#dada11",
  },
  icon: {
    fontSize: "2.5rem",
    cursor: "pointer",
    "&:hover": {
      color: "#e2e218",
    },
  },
}));

const Rating = ({ value, text, handleClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.ratingWrapper}>
      {text && (
        <Typography varinat="h3" className={classes.ratingText}>
          {text}
        </Typography>
      )}

      {[...Array(5).keys()].map((x) =>
        value >= x + 1 ? (
          <StarIcon
            key={x + 1}
            id={x + 1}
            className={`${classes.icon} ${classes.ratingIcon}`}
            onClick={handleClick}
          />
        ) : value >= x + 0.5 ? (
          <StarHalfIcon
            key={x + 1}
            id={x + 1}
            className={`${classes.icon} ${classes.ratingIcon}`}
            onClick={handleClick}
          />
        ) : (
          <StarBorderIcon
            key={x + 1}
            id={x + 1}
            className={classes.icon}
            onClick={handleClick}
          />
        )
      )}
    </div>
  );
};

export default Rating;
