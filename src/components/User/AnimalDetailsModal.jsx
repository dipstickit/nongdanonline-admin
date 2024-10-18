import React from 'react';
import { Modal, Typography, Divider, List, Card, Image, Row, Col } from 'antd';

const { Title, Text } = Typography;

const AnimalDetailsModal = ({ isVisible, onClose, animal }) => {
  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Modal
      title={<Title level={4}>Chi tiết vật nuôi</Title>}
      visible={isVisible}
      onOk={onClose}
      onCancel={onClose}
      width={600}
      footer={null}
    >
      {animal && (
        <div>
          <Row gutter={16}>
            <Col span={8}>
              <Image
                src={animal.animalStageImageUrl}
                alt={animal.animalName}
                width='100%'
              />
            </Col>
            <Col span={16}>
              <Title level={5}>{animal.animalName}</Title>
              <Text type='secondary'>Mã số: {animal.animalOwnerUserCode}</Text>
              <Divider />
              <Row>
                <Col span={12}>
                  <Text strong>Ngày bắt đầu:</Text>
                </Col>
                <Col span={12}>
                  <Text>{formatDate(animal.startDate)}</Text>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Text strong>Ngày kết thúc:</Text>
                </Col>
                <Col span={12}>
                  <Text>{formatDate(animal.endDate)}</Text>
                </Col>
              </Row>
            </Col>
          </Row>

          <Divider orientation='left'>
            <Text strong>Gói chăm sóc</Text>
          </Divider>
          <List
            itemLayout='horizontal'
            dataSource={animal.userAnimalOwnerCares}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Image src={item.carePackageImages} width={60} />}
                  title={item.carePackageName}
                  description={
                    <>
                      <Text>Thời gian: {item.timeUseByDay} ngày</Text>
                      <br />
                      <Text type='secondary'>
                        {formatDate(item.startDate)} -{' '}
                        {formatDate(item.endDate)}
                      </Text>
                      <br />
                      <Text>Số lượng: {item.quantityCarePackage}</Text>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      )}
    </Modal>
  );
};

export default AnimalDetailsModal;
