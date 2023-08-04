import {ILoginForm, IRoute} from "../interfaces";
import {authTokenKey} from "../constants/key";
import userServices from "../services";
import {SUCCESS_CODE} from "../constants/common";

const login = (loginForm: ILoginForm) => {
  userServices.login(loginForm).then((res) => {
    if (res.code !== SUCCESS_CODE)
      return res;
    if (loginForm.remember) {
      localStorage.setItem(authTokenKey, res.data['token']);
    } else {
      sessionStorage.setItem(authTokenKey, res.data['token']);
    }
    window.location.replace("/");
  });
}

const isLoggedIn = () => {
  if (sessionStorage.getItem(authTokenKey) === null && localStorage.getItem(authTokenKey) !== null) {
    sessionStorage.setItem(authTokenKey, localStorage.getItem(authTokenKey) as string)
  }

  return sessionStorage.getItem(authTokenKey) !== null;
}

const getAccessToken = () => {
  return sessionStorage.getItem(authTokenKey);
}

const logout = () => {
  sessionStorage.removeItem(authTokenKey);
  localStorage.removeItem(authTokenKey);
  window.location.replace("/");
}

const filterHasPermissions = (
  items: IRoute[],
  currentPermissions: string[]
) => {
  return items;
};

const userHelpers = {
  login,
  isLoggedIn,
  logout,
  filterHasPermissions,
  getAccessToken,
};

export default userHelpers;
