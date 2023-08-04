import React from "react";

export interface IPermission {
  app: string;
  resource: string;
  action?: string;
}

export interface IRoute {
  exact?: boolean;
  path: string;
  name: string;
  component?: React.ElementType;
  permissions?: IPermission[];
  icon?: React.ComponentType<{ className?: string }>;
  children?: string[];
  iFrameSrc?: string;
  attributes?: string[];
}

export interface IDataResponse {
  code: string;
  message: string;
  data?: any;
  metadata?: any;
}

export interface ISearchParams {
  fields?: string | undefined;
  operators?: string | undefined;
  values?: string | undefined;
  page?: number;
  size?: number;
  pageSize?: number;
  direction?: string;
  sortBy?: string;
}

export interface IPagination {
  total?: number;
  current?: number;
  pageSize?: number;
}
