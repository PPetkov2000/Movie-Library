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
  },
}));

const Rating = ({ value, text }) => {
  const classes = useStyles();

  return (
    <div className={classes.ratingWrapper}>
      {text && (
        <Typography varinat="h3" className={classes.ratingText}>
          {text}
        </Typography>
      )}

      {value >= 1 ? (
        <StarIcon className={[classes.icon, classes.ratingIcon]} />
      ) : value >= 0.5 ? (
        <StarHalfIcon className={[classes.icon, classes.ratingIcon]} />
      ) : (
        <StarBorderIcon className={classes.icon} />
      )}

      {value >= 2 ? (
        <StarIcon className={[classes.icon, classes.ratingIcon]} />
      ) : value >= 1.5 ? (
        <StarHalfIcon className={[classes.icon, classes.ratingIcon]} />
      ) : (
        <StarBorderIcon className={classes.icon} />
      )}

      {value >= 3 ? (
        <StarIcon className={[classes.icon, classes.ratingIcon]} />
      ) : value >= 2.5 ? (
        <StarHalfIcon className={[classes.icon, classes.ratingIcon]} />
      ) : (
        <StarBorderIcon className={classes.icon} />
      )}

      {value >= 4 ? (
        <StarIcon className={[classes.icon, classes.ratingIcon]} />
      ) : value >= 3.5 ? (
        <StarHalfIcon className={[classes.icon, classes.ratingIcon]} />
      ) : (
        <StarBorderIcon className={classes.icon} />
      )}

      {value >= 5 ? (
        <StarIcon className={[classes.icon, classes.ratingIcon]} />
      ) : value >= 4.5 ? (
        <StarHalfIcon className={[classes.icon, classes.ratingIcon]} />
      ) : (
        <StarBorderIcon className={classes.icon} />
      )}
    </div>
  );
};

export default Rating;
