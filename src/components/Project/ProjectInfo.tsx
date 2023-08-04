import React from "react";
import {Row, Col, Card, FormInstance, Form, Input, Checkbox, DatePicker, Select} from "antd";
import dayjs from 'dayjs';
import {ICategory} from "../../interfaces/category";
import {MODE} from "../../constants/common";
import {DataItem} from "../shared/DataItem/DataItem";


const ProjectInfo: React.FC<{
  mode: string
  form: FormInstance,
  categories: Array<ICategory>
}> = (
  {
    mode,
    form,
    categories
  }
) => {
  console.log(form.getFieldValue('name'))

  return (
    <Card>
      <Row>
        <Col>
          <h2>Thông tin dự án</h2>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={12} xs={24}>
          <Form.Item
            label="Tên dự án"
            name="name"
            rules={[{required: mode !== MODE.DETAIL, message: 'Vui lòng nhập tên dự án'}]}
          >
            <Input
              disabled={mode === MODE.DETAIL}
              placeholder="Tên dự án"
            />
          </Form.Item>
        </Col>

        <Col md={12} xs={24}>
          <Form.Item
            label="Lĩnh vực"
            name="categories"
          >
            <Select
              mode="multiple"
              disabled={mode === MODE.DETAIL}
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
            label="Ngày bắt đầu dự án"
            name="startDate"
          >
            <DatePicker
              placeholder="Ngày bắt đầu"
              format="DD/MM/YYYY"
              style={{width: "100%"}}
              defaultValue={dayjs()}
              disabled={mode === MODE.DETAIL}
            />
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item
            label=" "
            name="isPublic"
            valuePropName="checked"
          >
            <Checkbox
              defaultChecked={false}
              disabled={mode === MODE.DETAIL}
            >
              <span>
                Dự án công khai với cộng đồng
              </span>
            </Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col md={24} xs={24}>
          <Form.Item
            label="Mô tả dự án"
            name="description"
            rules={[{required: mode !== MODE.DETAIL, message: 'Vui lòng nhập mô tả dự án'}]}
          >
            <Input.TextArea
              disabled={mode === MODE.DETAIL}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col md={24}>
          <h2>Thông tin liên hệ</h2>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item
            label="Tên người/cơ quan đại diện"
            name="delegate"
            rules={[{required: mode !== MODE.DETAIL, message: 'Vui lòng nhập tên liên hệ'}]}
          >
            <Input
              disabled={mode === MODE.DETAIL}/>
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{required: mode !== MODE.DETAIL, message: 'Vui lòng nhập số điện thoại liên hệ'}]}
          >
            <Input
              disabled={mode === MODE.DETAIL}
            />
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{required: mode !== MODE.DETAIL, message: 'Vui lòng nhập email liên hệ'}]}
          >
            <Input
              disabled={mode === MODE.DETAIL}
            />
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item
            label="Website dự án"
            name="website"
          >
            <Input
              disabled={mode === MODE.DETAIL}
            />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  )
}

export default ProjectInfo