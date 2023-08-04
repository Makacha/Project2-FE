import React, {useEffect, useState} from "react";
import AppContainer from "../../AppLayout/AppContainer";
import {Button, Col, Form, Row} from "antd";
import ProjectInfo from "../../../components/Project/ProjectInfo";
import {MODE} from "../../../constants/common";
import {projectHooks} from "../../../hooks";
import dayjs from "dayjs";
import {projectHelpers} from "../../../helpers";
import CenterSpin from "../../../components/shared/Spin/CenterSpin";
import {MEMBER_STATUS} from "../../../constants/user";


const DetailProject: React.FC = (props: any) => {
  const params = props.match.params;
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState<any>();
  const {project} = projectHooks.useProject(params?.id);

  useEffect(() => {
    console.log(project)
    if (project) {
      setInitialValues({...project, startDate: dayjs(project.startDate)});
    }
  }, [project]);

  const onFinish = () => {
    if (project) {
      if (project.role)
        projectHelpers.accessProject(params?.id);
      else
        projectHelpers.requestProject({
          projectId: project.id
        });
    }
  };

  return (
    <AppContainer title="Thông tin chi tiết dự án">
      {(!initialValues) && (<CenterSpin/>)}
      {(initialValues) && (
        <Form
          form={form}
          initialValues={initialValues}
          onFinish={onFinish}
        >
          <ProjectInfo mode={MODE.DETAIL} form={form} categories={[]}/>
          <Row gutter={24}>
            <Col xs={24} style={{marginTop: '24px', textAlign: 'center'}}>
              <Button
                type="primary"
                htmlType="submit"
                disabled={project?.memberStatus === MEMBER_STATUS.WAITING}
              >
                {
                  project?.role && project?.memberStatus !== MEMBER_STATUS.INACTIVE ? (
                    project?.memberStatus === MEMBER_STATUS.ACTIVE
                      ? 'Truy cập dự án'
                      : 'Đang chờ quản trị viên phê duyệt'
                  ) : 'Xin tham gia vào dự án'
                }
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </AppContainer>
  );
}

export default DetailProject;