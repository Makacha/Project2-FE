import {ISearchParams} from "./common";

export interface IMember {
  userId: number;
  projectId: number;
  name: string;
  role: string;
  status: string;
}

export interface ISearchMemberParams extends ISearchParams {

}