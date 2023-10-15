import { Link } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  heroWrapper: {
    position: 'relative',
    minHeight: '50vh',
    display: 'flex',
    alignItems: 'center',
  },
  heroImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1,
  },
  heroTitle: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '3rem',
    },
  },
  heroSubtitle: {
    width: '50%',
    backgroundColor: '#eee',
    boxShadow: '0 0 6px black',
    marginTop: '0.5rem',
    marginBottom: '1rem',
    padding: '0.8rem',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
}))

const Hero = () => {
  const classes = useStyles()

  return (
    <div className={classes.heroWrapper}>
      <img src="assets/hero-image1.jpg" alt="hero" className={classes.heroImage} />
      <Container>
        <Typography variant="h2" className={classes.heroTitle}>
          Your Movie Library
        </Typography>
        <Typography variant="subtitle1" className={classes.heroSubtitle}>
          Our mission is to unite movie lovers and have a good time while watching cult movies. In cinematography we trust.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/search">
          Search
        </Button>
      </Container>
    </div>
  )
}

export default Hero
