import React from 'react';
import { Col, Row } from 'antd';

export const DataItem: React.FC<{ children: React.ReactNode, title: string }> = ({ children, title }) => {
  return (
    <Row className={'detail-item-container'}>
      <Col xs={24} sm={12} className={'detail-item-title'}>
        {title}
      </Col>
      <Col xs={24} sm={12} className={'detail-item-content'}>
        {children}
      </Col>
    </Row>
  );
};
