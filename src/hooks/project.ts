import {IPagination, IProject, ISearchProjectParams} from "../interfaces";
import {Form} from "antd";
import {useEffect, useState} from "react";
import pickBy from 'lodash/pickBy';
import {commonHelpers} from "../helpers";
import projectServices from "../services/apis/project";


const useProjectFilter = (
  params: ISearchProjectParams,
  setParams: (params: ISearchProjectParams) => void,
) => {

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false);
  const [filterParams] = useState<ISearchProjectParams>();

  const initialValues = {
    ...params
  };

  const onFinish = (conditions: any) => {

    const data = {
      ...pickBy(
        {
          ...conditions
        },
        (v) => !commonHelpers.isEmptyData(v)
      )
    }

    const searchFields = Object.keys(data).join('|');
    const searchValues = Object.values(data).join('|');

    const listOperators: any = {
      projectFilters: 'LIKE',
    };

    const searchOperators = Object.keys(data)
      .map((i: any) => listOperators[i] ? listOperators[i] : "EQ")
      .join('|');

    const params = {...filterParams};

    params.fields = searchFields;
    params.operators = searchOperators;
    params.values = searchValues;
    params.sortBy = 'created_at';
    setParams(params);
    commonHelpers.pushQuery(data);
  };

  return {
    form,
    loading,
    setLoading,
    initialValues,
    onFinish,
  };
}

const useProjects = (defaultParams: ISearchProjectParams) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [params, setParams] = useState<ISearchProjectParams>(defaultParams);
  const [pagination, setPagination] = useState<IPagination>();
  const [projects, setProjects] = useState<Array<IProject>>([]);

  const getProjects = async () => {
    try {
      setLoading(true);
      const result = await projectServices.searchProject(params);
      const {data, metadata} = result;

      setProjects(data);
      setPagination({...metadata});

    } finally {
      setLoading(false);
    }
  }

  const handleTableChange = (
    pagination: IPagination
  ) => {
    const newQueryParams = {
      ...params,
      page: pagination.current,
      size: pagination.pageSize,
    };
    setParams(newQueryParams);
  };

  useEffect(() => {
    getProjects().then()
  }, [params])

  return {
    loading,
    params,
    setLoading,
    setParams,
    pagination,
    projects,
    handleTableChange,
    getProjects,
  }
}

const useProject = (projectId?: number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [project, setProject] = useState<IProject | null>(null);
  const getProjectById = async (projectId: number) => {
    try {
      setLoading(true);
      const result = await projectServices.detailProject(projectId);
      const {data} = result;
      setProject(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (projectId)
      getProjectById(projectId).then((r) => r);
  }, [projectId]);

  return {
    loading,
    project,
    setProject,
    getProjectById,
  };
}

const projectHooks = {
  useProjectFilter,
  useProjects,
  useProject,
}

export default projectHooks;
