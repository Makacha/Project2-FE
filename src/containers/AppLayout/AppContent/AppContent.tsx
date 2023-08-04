import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import {IRoute} from "../../../interfaces";
import AppBreadcrumb from "../AppBreadcrumb";

const { Content } = Layout;

interface AppContentProps {
  filteredRoutes: IRoute[];
}

const AppContent: React.FC<AppContentProps> = (props) => {
  const { filteredRoutes } = props;
  return (
    <Content className="app-content">
      <Suspense fallback={null}>
        <Switch>
          {filteredRoutes.map(
            ({ component: Component, iFrameSrc, ...rest }) => {
              return (
                <Route
                  {...rest}
                  key={uuidv4()}
                  render={(routeProps) => {
                    const crumbs = filteredRoutes
                      // Get all routes that contain the current one
                      .filter(({ path }) =>
                        routeProps.match.path.includes(path)
                      )
                      // Swap out any dynamic routes with their param values
                      // E.g. "/products/:id" will become "/products/1"
                      .map(({ path, name }) => {
                        return {
                          path: Object.keys(routeProps.match.params).length
                            ? Object.keys(routeProps.match.params).reduce(
                              (path, param) =>
                                path.replace(
                                  `:${param}`,
                                  routeProps.match.params[param] || ''
                                ),
                              path
                            )
                            : path,
                          breadcrumbName: name,
                        };
                      });
                    if (!Component) return null;
                    return (
                      <>
                        <AppBreadcrumb crumbs={crumbs} />
                        <Component iFrameSrc={iFrameSrc} {...routeProps} />
                      </>
                    );
                  }}
                />
              );
            }
          )}
          <Redirect from="/" to="/403" />
        </Switch>
      </Suspense>
    </Content>
  );
};

export default AppContent;
