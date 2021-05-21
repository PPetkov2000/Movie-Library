import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navigation from "../components/Navigation";
import Home from "../pages/Home";
import Search from "../pages/Search";
import MovieDetails from "../pages/MovieDetails";
import Register from "../pages/Register";
import Login from "../pages/Login";

const Router = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route path={["/", "/home"]} exact component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/movie/:movieTitle" component={MovieDetails} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
