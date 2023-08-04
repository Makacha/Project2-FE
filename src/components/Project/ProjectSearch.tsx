import React, {useContext} from "react";
import {Button, Checkbox, Col, Form, Input, Row, Select} from "antd";
import {SearchOutlined} from '@ant-design/icons';
import {projectHooks} from "../../hooks";
import {ISearchProjectParams} from "../../interfaces";
import {StoreContext} from "../../contexts";
import {ICategory} from "../../interfaces/category";
import ContentBlock from "../shared/ContentBlock/ContentBlock";


const ProjectSearch: React.FC<{
  params: ISearchProjectParams;
  setParams: (query: ISearchProjectParams) => void;
  categories: Array<ICategory>;
}> = (
  {
    params,
    setParams,
    categories,
  }
) => {

  const {currentUser} = useContext(StoreContext);


  const {form, initialValues, onFinish} = projectHooks.useProjectFilter(
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
              label="Tên dự án"
              name="name"
            >
              <Input/>
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              label="Lĩnh vực"
              name="categories"
            >
              <Select
                mode="multiple"
                allowClear={true}
                showSearch={true}
              >
                {categories.map((category) =>
                  <Select.Option key={category.code} value={category.code}>
                    {category.name}
                  </Select.Option>
                )}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Form.Item
              label="Trạng thái"
              name="status"
            >
              <Select
                mode="multiple"
                allowClear={true}
              >
                <Select.Option value="0">Chưa bắt đầu</Select.Option>
                <Select.Option value="1">Đang hoạt động</Select.Option>
                <Select.Option value="2">Đã đóng</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              label=" "
              name="isJoined"
              valuePropName="checked"
            >
              <Checkbox
                defaultChecked={false}
              >
                <span>Đã tham gia</span>
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          style={{
            textAlign: 'center',
          }}
        >
          <Button type="primary" htmlType="submit" icon={<SearchOutlined/>}>
            Tìm kiếm
          </Button>
        </Form.Item>
      </Form>
    </ContentBlock>
  );
}

export default ProjectSearch;
