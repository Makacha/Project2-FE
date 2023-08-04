import { useState, useEffect } from 'react';
import {browserHistory} from '../helpers';
import commonHelpers from '../helpers/common';
import { IRoute } from '../interfaces';
import { matchPath, useLocation } from 'react-router-dom';
import routes from '../routes';

const { getWindowDimensions } = commonHelpers;

const useAppMenu = (items: IRoute[]) => {
  const { location } = browserHistory;
  let selectedKey = location.pathname;
  const selectedKeySplitArr = location.pathname.split('/');
  let i = 1;
  let newSelectedKey = '';

  const getParentKey = (key: string): IRoute | undefined => {
    const newParentKey = items.find(
      (item) => item.children && item.children.includes(key)
    );
    if (newParentKey) return newParentKey;
    else if (i < selectedKeySplitArr.length) {
      newSelectedKey += `/${selectedKeySplitArr[i++]}`;
      selectedKey = newSelectedKey;
      return getParentKey(selectedKey);
    }
  };

  const parentKey = getParentKey(selectedKey);
  const openKey = parentKey ? parentKey.path : '/';

  return { selectedKey, openKey };
};

const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState(getWindowDimensions);

  useEffect(() => {
    const handleResize = () => setDimensions(getWindowDimensions());
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return dimensions;
};

const usePathname = () => {
  const [pathname, setPathname] = useState<string>(window.location.pathname);
  const { pathname: appPathname } = useLocation();

  useEffect(() => {
    setPathname(appPathname);
  }, [appPathname]);

  useEffect(() => {
    function onPopState() {
      setPathname(window.location.pathname);
    }
    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  return pathname;
};

const useCurrentRoute = () => {
  const [matchedRoutes, setMatchedRoutes] = useState<IRoute[]>([]);
  const pathname = usePathname();

  const updateCurrentRoute = () => {
    //Step 1: find all matched parent routes. E.g: /orders/marketplace/31OADF4 --> /, /orders, /orders/marketplace, /orders/marketplace/:id
    let matchedRoutes = routes.filter((route) =>
      matchPath(window.location.pathname, { path: route.path })
    );
    // If the route is static, remove dynamic route
    if (
      matchedRoutes.some((route) => route.path === window.location.pathname)
    ) {
      matchedRoutes = matchedRoutes.filter(
        (route) => !route.path.includes(':')
      );
    }
    //Step 2: sort by path name
    const sorted = matchedRoutes?.sort((a, b) =>
      a.path < b?.path ? -1 : a?.path > b?.path ? 1 : 0
    );
    setMatchedRoutes(sorted);
  };

  // update current route on each navigation
  useEffect(() => {
    updateCurrentRoute();
  }, [pathname]);

  return {
    matchedRoutes,
    currentRoute: matchedRoutes[matchedRoutes.length - 1],
  };
};

const commonHooks = {
  useAppMenu,
  useWindowDimensions,
  useCurrentRoute,
};

export default commonHooks;
