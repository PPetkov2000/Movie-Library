import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth } from '../contexts/AuthProvider'
import { LOGIN_FIELDS } from '../configs/form-fields'
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Login = ({ history }) => {
  const classes = useStyles()
  const { login, authUser } = useAuth()
  const { formData, handleChange } = useForm({ username: '', password: '' })
  const { loading, error, execute: executeLogin } = useAsync(() => login(formData), [formData], false)

  useEffect(() => {
    if (authUser) {
      history.push('/')
    }
  }, [history, authUser])

  const submitHandler = (e) => {
    e.preventDefault()
    executeLogin()
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {error && (
          <Message variant="error" data-testid="error-message">
            {error}
          </Message>
        )}
        <form className={classes.form} noValidate onSubmit={submitHandler}>
          {LOGIN_FIELDS(formData).map((field, index) => (
            <TextField
              {...field}
              key={field.name}
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus={index === 0}
              value={formData[field.name]}
              onChange={handleChange}
            />
          ))}
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={loading}>
            {loading ? 'Loading...' : 'Sign In'}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register">Don't have an account? Sign Up</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default Login
