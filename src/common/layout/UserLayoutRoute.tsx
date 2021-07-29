import React, { ComponentType } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import Dasboard from "../../components/DashBoard/Dasboard";
interface Item extends RouteProps {
  component: ComponentType<any>;
}
function UserLayoutRoute({ component: MyComponent, ...rest }: Item) {
  const token = localStorage.getItem("token");
  if (!MyComponent) return null;
  return (
    <Route
      {...rest}
      render={(allProps) =>
        token ? (
          <Dasboard>
            <MyComponent {...allProps} />
          </Dasboard>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default UserLayoutRoute;
