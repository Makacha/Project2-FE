import services from "./request";
import {getResult} from "../../helpers/request";
import {IProjectForm, IRequestProject, ISearchProjectParams} from "../../interfaces";


const createProject = async (data: IProjectForm) => {
  return services.post('/project', data).then(getResult);
}

const searchProject = async (params: ISearchProjectParams)=> {
  return services.get('/project', {params}).then(getResult);
}

const detailProject = async (projectId: number) => {
  return services.get(`/project/${projectId}`).then(getResult);
}

const accessProject = async (projectId: number) => {
  return services.get(`/project/access/${projectId}`).then(getResult);
}

const requestProject = async (params: IRequestProject) => {
  return services.post('/project/request', params).then(getResult);
}

const projectServices = {
  createProject,
  searchProject,
  detailProject,
  accessProject,
  requestProject,
}

export default projectServices;