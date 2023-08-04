import {IMember, IPagination, ISearchMemberParams} from "../interfaces";
import {Form} from "antd";
import {useEffect, useState} from "react";
import pickBy from "lodash/pickBy";
import {commonHelpers} from "../helpers";
import userServices from "../services";


const useMemberFilter = (
  params: ISearchMemberParams,
  setParams: (params: ISearchMemberParams) => void
) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [filterParams] = useState<ISearchMemberParams>();

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
    };

    const searchFields = Object.keys(data).join('|');
    const searchValues = Object.values(data).join('|');
    const searchOperators = Object.keys(data)
      .map((i: any) => "EQ")
      .join('|');

    const params = {...filterParams};

    params.fields = searchFields;
    params.operators = searchOperators;
    params.values = searchValues;
    params.sortBy = 'created_at';
    setParams(params);
    commonHelpers.pushQuery(params);
  }

  return {
    form,
    loading,
    setLoading,
    initialValues,
    onFinish,
  };
}

const useMember = (defaultParams: ISearchMemberParams) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [params, setParams] = useState<ISearchMemberParams>(defaultParams);
  const [pagination, setPagination] = useState<IPagination>();
  const [members, setMembers] = useState<Array<IMember>>([]);

  const getMembers = async () => {
    try {
      setLoading(true);
      const result = await userServices.searchUser(params)
      const {data, metadata} = result;
      setMembers(data);
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
    getMembers().then()
  }, [params]);

  return {
    loading,
    params,
    setLoading,
    setParams,
    pagination,
    members,
    handleTableChange,
    getMembers,
  }
}

const memberHooks = {
  useMemberFilter,
  useMember
}

export default memberHooks;