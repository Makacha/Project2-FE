import React from "react";
import {Col, Card, FormInstance, Row} from "antd";


const ProjectConfig: React.FC<{
  form: FormInstance,
  style: any
}> = ({form, style}) => {
  return (
    <Card style={style}>
      <Row>
        <Col>
          <h2>Cấu hình dự án</h2>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col md={12} xs={24}>
        </Col>
      </Row>
    </Card>
  );
}

export default ProjectConfig;