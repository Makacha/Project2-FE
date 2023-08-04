import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import {ItemType} from "antd/lib/breadcrumb/Breadcrumb";

interface AppBreadcrumbProps {
  crumbs: ItemType[];
}

const AppBreadcrumb: React.FC<AppBreadcrumbProps> = (props) => {
  const { crumbs } = props;

  const itemRender = (route: ItemType, params: object, routes: ItemType[]) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={route.path?.toString() as string}>{route.breadcrumbName}</Link>
    );
  };

  return (
    <Breadcrumb
      className="app-breadcrumb"
      itemRender={itemRender}
      items={crumbs}
    />
  );
};

export default AppBreadcrumb;
