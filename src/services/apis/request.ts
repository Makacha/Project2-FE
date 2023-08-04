import axios from 'axios';
import {handleError, handleSuccess} from "../../helpers/request";
import {userHelpers} from "../../helpers";


const services = axios.create({
  baseURL: window.BACKEND_URL
});

const getAuthorization = () => {
  return userHelpers.isLoggedIn()
    ? `Bearer ${userHelpers.getAccessToken()}`
    : '';
};

const requestInterceptor = (request: any) => {
  request.headers.Authorization = getAuthorization();
  return request
}

services.interceptors.request.use(requestInterceptor);
services.interceptors.response.use(handleSuccess, handleError);

export default services;
