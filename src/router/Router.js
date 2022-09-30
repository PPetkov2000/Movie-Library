import { Suspense, lazy } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Loader from '../components/Loader'
import Navigation from '../components/Navigation'

const Home = lazy(() => import('../pages/Home'))
const Search = lazy(() => import('../pages/Search'))
const MovieDetails = lazy(() => import('../pages/MovieDetails'))
const Register = lazy(() => import('../pages/Register'))
const Login = lazy(() => import('../pages/Login'))
const Footer = lazy(() => import('../components/Footer'))

const Router = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <main className="main-container">
        <Switch>
          <Suspense fallback={<Loader />}>
            <Route path={['/', '/home']} exact component={Home} />
            <Route path={['/search', '/search/:keyword']} exact component={Search} />
            <Route path="/movie/:id" component={MovieDetails} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Suspense>
        </Switch>
      </main>
      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
