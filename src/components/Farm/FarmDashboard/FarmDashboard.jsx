import { Card, Col, Flex, Row } from 'antd';
import React from 'react';


function FarmDashboard({ revenue }) {
  return (
    <Row style={{ marginBottom: '100px' }}>
      <Col>
        <Card title='Doanh thu trang trại'>
          <Flex justify='space-between' align='center'>
            <h2>{revenue?.data?.data?.revenue}</h2>
            <span>đ</span>
          </Flex>
        </Card>
      </Col>
    </Row>
  );
}

export default FarmDashboard;
