import {ISearchParams} from "./common";
import {ICategory} from "./category";


export interface IProjectForm {
  name: string;
  startDate: string;
  isPublic: boolean;
  categories: string;
  description: string;
  delegate: string;
  phone: string;
  email: string;
  website: string;
}

export interface IProject {
  id: number;
  name: string;
  startDate: string;
  isPublic: boolean;
  categories: Array<ICategory>;
  description: string;
  delegate: string;
  phone: string;
  email: string;
  website: string;
  role: string;
  memberStatus: string;
}

export interface IRequestProject {
  projectId: number;
  role?: string;
}

export interface ISearchProjectParams extends ISearchParams {
}

