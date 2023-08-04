import {IProjectForm, IRequestProject} from "../interfaces";
import dayjs from "dayjs";
import projectServices from "../services/apis/project";
import {SUCCESS_CODE} from "../constants/common";
import {authTokenKey} from "../constants/key";
import {browserHistory} from "./index";
import {notification} from "antd";


const parseToProjectForm = (data: any): IProjectForm => {
  console.log(data['startDate'])
  if (data['startDate'] !== undefined) {
    console.log(data['startDate'])
    data['startDate'] = data['startDate'].toISOString();
  } else
    data['startDate'] = dayjs().toISOString();

  if (data['isPublic'] === undefined)
    data['isPublic'] = false
  return data as IProjectForm;
}

const accessProject = (projectId: number) => {
  projectServices.accessProject(projectId).then((res) => {
      if (res.code !== SUCCESS_CODE)
        return res;
      sessionStorage.setItem(authTokenKey, res.data['token']);
      window.location.reload();
    }
  );
}

const requestProject = (params: IRequestProject) => {
  projectServices.requestProject(params).then((res) => {
    if (res.code !== SUCCESS_CODE)
      return res;
    notification.success({
      message: "Đăng ký tham gia thành công!",
      description: "Vui lòng đợi quản trị viên duyệt!"
    });
  })
}

const createProject = (values: any) => {

  values = projectHelpers.parseToProjectForm(values);
  projectServices.createProject(values).then((res) => {
    if (res.code === SUCCESS_CODE)
      browserHistory.push(`/project/detail/${res.data.id}`);
  });
}

const projectHelpers = {
  parseToProjectForm,
  accessProject,
  createProject,
  requestProject
}

export default projectHelpers;