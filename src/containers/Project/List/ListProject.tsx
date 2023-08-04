import React from "react";
import AppContainer from "../../AppLayout/AppContainer";
import ProjectSearch from "../../../components/Project/ProjectSearch";
import {projectHooks} from "../../../hooks";
import {browserHistory} from "../../../helpers";
import queryString from 'query-string';
import {Pagination, Table} from "antd";
import ContentBlock from "../../../components/shared/ContentBlock/ContentBlock";
import {Link} from "react-router-dom";
import {IProject} from "../../../interfaces";


const ListProject: React.FC = () => {
  const {location} = browserHistory;
  const queryParams = queryString.parse(location.search) as any;

  const fields = (queryParams.projectFilter ? "projectFilter" : "");

  const values = (queryParams.projectFilter ? queryParams.projectFilter : "");

  const operators = (queryParams.projectFilter ? "EQ" : "");

  const {
    loading,
    params,
    setParams,
    pagination,
    projects,
    handleTableChange,
  } = projectHooks.useProjects({
      fields: fields.startsWith('|') ? fields.substring(1) : fields,
      values: values.startsWith('|') ? values.substring(1) : values,
      operators: operators.startsWith('|') ? operators.substring(1) : operators,
      pageSize: 50,
      page: 1,
      sortBy: 'created_at',
      direction: 'desc',
    }
  );

  const onPaginationChange = (page: number, pageSize?: number) => {
    setParams({
      ...params,
      page: params.pageSize === pageSize ? page : 1,
      pageSize,
    });
  };

  const columns: any = [
    {
      "title": "Tên dự án",
      render: (_: any, record: IProject) => {
        return (<Link to={`/project/detail/${record.id}`}>
          {record.name}
        </Link>);
      }
    },
    {
      "title": "Lĩnh vực",
      "dataIndex": "categories",
      "key": "categories"
    },
    {
      "title": "Trạng thái",
      "dataIndex": "status",
      "key": "status"
    }
  ]

  return (
    <AppContainer title="Danh sách dự án">
      <ProjectSearch params={params} setParams={setParams} categories={[]}/>

      <ContentBlock
        title={
          <span className="text-h3">
            Tổng số dự án phù hợp : {pagination?.total || 0}
          </span>
        }
      >
        <Table
          scroll={{x: '100%'}}
          bordered
          columns={columns}
          rowKey="id"
          dataSource={projects}
          pagination={false}
          loading={loading}
          locale={{emptyText: "Không tìm thấy bản ghi nào"}}
          onChange={handleTableChange}
        />
        <div
          style={{
            textAlign: 'right',
            marginTop: '16px',
          }}
        >
          <Pagination
            current={pagination?.current}
            total={pagination?.total}
            defaultPageSize={50}
            pageSizeOptions={['50', '100']}
            onChange={onPaginationChange}
          />
        </div>
      </ContentBlock>
    </AppContainer>
  );
};

export default ListProject;