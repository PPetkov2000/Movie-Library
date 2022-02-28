import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return authUser ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        );
      }}
    />
  );
};

export default PrivateRoute;
