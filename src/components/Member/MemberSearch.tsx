import React, {useContext} from "react";
import {ISearchMemberParams} from "../../interfaces";
import {StoreContext} from "../../contexts";
import {memberHooks} from "../../hooks";
import ContentBlock from "../shared/ContentBlock/ContentBlock";
import {Button, Col, Form, Input, Row, Select} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const MemberSearch: React.FC<{
  params: ISearchMemberParams;
  setParams: (query: ISearchMemberParams) => void;
}> = (
  {
    params,
    setParams,
  }
) => {
  const {currentUser} = useContext(StoreContext);

  const {form, initialValues, onFinish} = memberHooks.useMemberFilter(
    params,
    setParams,
  );

  return (
    <ContentBlock>
      <Form
        layout="vertical"
        form={form}
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Form.Item
              label="Tên thành viên"
              name="name"
            >
              <Input/>
            </Form.Item>
          </Col>
          <Col md={8} xs={24}>
            <Form.Item
              label="Vai trò"
              name="role"
            >
              <Select
                mode="multiple"
                allowClear={true}
                showSearch={true}
              >
                <Select.Option key="Khách">Khách</Select.Option>
                <Select.Option key="Thành viên">Thành viên</Select.Option>
                <Select.Option key="Quản trị viên">Quản trị viên</Select.Option>
                <Select.Option key="Chủ dự án">Chủ dự án</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col md={4} xs={24}>
            <Form.Item
              label=" "
              style={{
                textAlign: 'center',
              }}
            >
              <Button type="primary" htmlType="submit" icon={<SearchOutlined/>}>
                Tìm kiếm
              </Button>
            </Form.Item>
          </Col>
        </Row>

      </Form>
    </ContentBlock>
  );
}

export default MemberSearch;