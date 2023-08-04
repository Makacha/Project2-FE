import React from "react";
import {Form, Button, Row, Col} from "antd";
import AppContainer from '../../AppLayout/AppContainer';
import {ProjectInfo, ProjectConfig} from "../../../components/Project";
import {projectHelpers} from "../../../helpers";
import {MODE} from "../../../constants/common";


const CreateProject: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <AppContainer title={'Tạo mới dự án'}>
      <Form
        layout={'vertical'}
        name="createProject"
        form={form}
        onFinish={projectHelpers.createProject}
      >
        <ProjectInfo mode={MODE.CREATE} form={form} categories={[]}/>
        <ProjectConfig form={form} style={{marginTop: '24px'}}/>
        <Row gutter={24}>
          <Col xs={24} style={{marginTop: '24px',textAlign: 'center'}}>
            <Button type="primary" htmlType="submit">
              Tạo mới
            </Button>
          </Col>
        </Row>
      </Form>
    </AppContainer>
  );
}

export default CreateProject;
