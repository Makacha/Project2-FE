import services from "./request";
import {getResult} from "../../helpers/request";
import {IRequestProject} from "../../interfaces";

const signUp = async (params: any) => {
  return services.post('/user/signup', params).then(getResult);
}

const login = async (params: any) => {
  return services.post('/user/login', params).then(getResult);
}

const getUserInfo = async () => {
  return services.get('/user/info').then(getResult);
}

const searchUser = async (params: any) => {
  return services.get('/user', {params}).then(getResult);
}

const userServices = {
  signUp,
  login,
  getUserInfo,
  searchUser
}

export default userServices;
