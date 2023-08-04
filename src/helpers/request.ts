import {IDataResponse} from "../interfaces";
import {notification} from "antd";

export const handleSuccess = (response: any) => {
  return response;
};

export const handleError = (error: any) => {
  const status = error && error.response && error.response.status;
  let response = {
    status: '500',
    data: {
      code: '999',
      message: 'Đã có lỗi xảy ra!'
    }
  }
  switch (status) {
    default:
      if (error.response && error.response.data) {
        response = error.response;
      }
      notification.error({
        message: 'Thất bại',
        description: response.data.message
      });
  }
  return response;
};
export const getResult = (res: any) => (res.data as IDataResponse);

const requestHelpers = {};

export default requestHelpers;