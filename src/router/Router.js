import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navigation from "../components/Navigation";
import Home from "../pages/Home";
import Search from "../pages/Search";
import MovieDetails from "../pages/MovieDetails";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Footer from "../components/Footer";

const Router = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <main className="main-container">
        <Switch>
          <Route path={["/", "/home"]} exact component={Home} />
          <Route
            path={["/search", "/search/:keyword"]}
            exact
            component={Search}
          />
          <Route path="/movie/:id" component={MovieDetails} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
