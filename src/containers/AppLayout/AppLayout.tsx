import React from "react";
import { Layout } from 'antd';
import './AppLayout.scss';
import AppHeader from './AppHeader';
import AppSider from "./AppSider";
import AppContent from "./AppContent";
import {userHooks} from "../../hooks";
import {IRoute} from "../../interfaces";
import routes from "../../routes";


const AppLayout: React.FC = () => {
  const { filteredNavigation, filteredRoutes } = userHooks.useAuthorizationData(
    routes as IRoute[]
  );
  return (
    <Layout className="app-layout">
      <AppSider filteredNavigation={filteredNavigation}/>
      <Layout>
        <AppHeader />
        <AppContent filteredRoutes={filteredRoutes} />
      </Layout>
    </Layout>);
};

export default AppLayout;
