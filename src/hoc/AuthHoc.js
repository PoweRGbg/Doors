import { useContext } from "react";
import { Redirect } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export const isAuth = (Component) => {
  //   const EnhancedComponent = higherOrderComponent(Component);

  const EnhancedComponent = (props) => {
    let { user } = useContext(AuthContext);

    if (!user)
    if (sessionStorage.getItem("email")) {
        user.email = sessionStorage.getItem("email");
        user.accessToken = sessionStorage.getItem('userToken');
        user.userId = sessionStorage.getItem('userId');
    }
    
    return !user.email 
    ? <Redirect to="/login"></Redirect> 
    : <Component {...props} user={user}/>;
  };

  return EnhancedComponent;
};
