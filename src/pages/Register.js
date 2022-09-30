import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth } from '../contexts/AuthProvider'
import { REGISTER_FIELDS } from '../configs/form-fields'
import Message from '../components/Message'
import useForm from '../customHooks/useForm'
import useAsync from '../customHooks/useAsync'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Register = ({ history }) => {
  const classes = useStyles()
  const { register, authUser } = useAuth()
  const { formData, handleChange } = useForm({ username: '', password: '', confirmPassword: '' })
  const { loading, error, execute: executeRegister } = useAsync(() => register(formData), [formData], false)

  useEffect(() => {
    if (authUser) {
      history.push('/')
    }
  }, [history, authUser])

  const submitHandler = (e) => {
    e.preventDefault()
    executeRegister()
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {error && <Message variant="error">{error}</Message>}
        <form className={classes.form} noValidate onSubmit={submitHandler}>
          <Grid container spacing={2}>
            {REGISTER_FIELDS(formData).map((field, index) => (
              <Grid item xs={12} key={field.name}>
                <TextField {...field} variant="outlined" fullWidth autoFocus={index === 0} value={formData[field.name]} onChange={handleChange} />
              </Grid>
            ))}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={loading}>
            {loading ? 'Loading...' : 'Sign Up'}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default Register
