import {IRoute, IUserInfo} from "../interfaces";
import {browserHistory, userHelpers} from "../helpers";
import {useEffect, useState} from "react";
import userServices from "../services";

const useUserInfo = () => {
  const [currentUser, setCurrentUser] = useState<IUserInfo>();

  const getFullUserInfo = async () => {
    const fullUserInfo = await userServices.getUserInfo();
    setCurrentUser(fullUserInfo.data as IUserInfo);
    browserHistory.push(window.location);
  };

  useEffect(() => {
    getFullUserInfo().then((r) => r);
  }, []);

  return {currentUser};
};
const useAuthorizationData = (items: IRoute[]) => {


  const filteredNavigation = userHelpers.filterHasPermissions(
    items,
    ['lmao']
  );

  const filteredRoutes = filteredNavigation.filter(
    (item) => !item.children && item.component
  );


  return {filteredNavigation, filteredRoutes};
};


const userHooks = {
  useUserInfo,
  useAuthorizationData,
};

export default userHooks;
