import React from "react";
import AppContainer from "../../AppLayout/AppContainer";
import ContentBlock from "../../../components/shared/ContentBlock/ContentBlock";
import MemberSearch from "../../../components/Member";
import {memberHooks} from "../../../hooks";
import {Pagination, Table} from "antd";

const ListMember: React.FC = () => {

  const {
    loading,
    params,
    setParams,
    pagination,
    members,
    handleTableChange
  } = memberHooks.useMember(
    {
      fields: '',
      values: '',
      operators: '',
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


  const columns = [
    {
      "title": "Họ và tên",
      "dataIndex": "fullname",
      "key": "fullname"
    },
    {
      "title": "Chức vụ",
      "dataIndex": "role",
      "key": "role"
    }
  ]

  return (
    <AppContainer title="Danh sách thành viên">
      <MemberSearch params={params} setParams={setParams}/>
      <ContentBlock title={
        <span className="text-h3">
          Tổng số thành viên phù hợp :
        </span>
      }>

        <Table
          scroll={{x: '100%'}}
          bordered
          columns={columns}
          rowKey="id"
          dataSource={members}
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
}

export default ListMember;
