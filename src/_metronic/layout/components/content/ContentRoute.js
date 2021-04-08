import usePermission from "app/components/NeedPermission/usePermission";
import React from "react";
import { Route } from "react-router-dom";
import { Content } from "./Content";
import ErrorPage from 'app/modules/Error/ErrorPage';

export function ContentRoute({ children, component, render, need, permissionJoin = 'or', ...props }) {

  const isRenderRoute = usePermission(need, permissionJoin);

  return (
    <Route {...props}>
      {(routeProps) => {
        if (!isRenderRoute) return <ErrorPage />;

        if (typeof children === "function") {
          return <Content>{children(routeProps)}</Content>;
        }

        if (!routeProps.match) {
          return null;
        }

        if (children) {
          return <Content>{children}</Content>;
        }

        if (component) {
          return (
            <Content>{React.createElement(component, routeProps)}</Content>
          );
        }

        if (render) {
          return <Content>{render(routeProps)}</Content>;
        }

        return null;
      }}
    </Route>
  );
}
