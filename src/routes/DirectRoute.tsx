import React from "react";
import {IRoute} from "../interfaces/";
import {Route} from "react-router-dom";
import {userHooks} from "../hooks";
import {StoreContext} from "../contexts";
import Login from "../containers/Login";
import {userHelpers} from "../helpers";
import {Spin} from "antd";
import CenterSpin from "../components/shared/Spin/CenterSpin";


const DirectRoute: React.FC<IRoute> = ({component: Component, ...rest}: IRoute) => {

  if (!userHelpers.isLoggedIn())
    return <Login/>;

  const { currentUser} = userHooks.useUserInfo();

  if (!currentUser)
    return <CenterSpin/>;

  if (!Component) return null;
  return (
      <StoreContext.Provider value={{currentUser}}>
        <Route {...rest} render={(routeProps) => <Component {...routeProps}/>}/>
      </StoreContext.Provider>
  );
};

export default DirectRoute;