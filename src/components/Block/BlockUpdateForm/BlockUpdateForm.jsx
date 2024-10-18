import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Row,
  Col,
  Card,
  Typography,
  Divider,
  Image,
  Space,
  Spin,
  Flex,
  Form,
  Input,
  Modal,
  Select,
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import CustomButton from '../../Button/CustomButton';
import {
  useGetBlockQuery,
  useUpdateBlockMutation,
} from '../../../features/blocks/blocksApi';
import { useGetFarmListQuery } from '../../../features/farms/farmApi';

const { Title, Text } = Typography;

const BlockUpdateForm = () => {
  const { blockId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  //get all block with pagination
  const { data, isLoading, isError, refetch, isSuccess } = useGetBlockQuery({
    index: currentPage,
    pageSize,
  });
  const { data: farms, isLoading: isFarmsLoading } = useGetFarmListQuery();
  const [updateBlock] = useUpdateBlockMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  if (isLoading) {
    return (
      <Row justify='center' align='middle' style={{ height: '80vh' }}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
      </Row>
    );
  }

  let block;
  if (isSuccess) {
    block = data.items.find(block => block.blockID === blockId);
  }

  const handleEditClick = () => {
    console.log(block);

    setIsModalOpen(true);
    form.setFieldsValue({
      blockName: block?.blockName,
      blockPrice: block?.blockPrice,
      blockDescription: block?.blockDescription,
      rentTimeByDay: block?.rentTimeByDay,
      farmID: block?.farmResponse.farmID,
    });
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await updateBlock({ id: blockId, data: values }).unwrap();
      setIsModalOpen(false);
      refetch();
    } catch (error) {
      console.error('Failed to update block:', error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Card
      style={{
        maxWidth: 800,
        margin: 'auto',
        marginTop: '20px',
        padding: '20px',
        borderRadius: '8px',
      }}
    >
      <Flex justify='space-between' align='center'>
        <Title level={3}>{block?.blockName}</Title>
        {block?.isDeleted ? (
          <Title level={2} style={{ color: 'red' }}>
            Đã xóa
          </Title>
        ) : (
          <>
            <div>
              <h2 level={4} style={{ color: 'green' }}>
                Đang hoạt động
              </h2>
              <CustomButton
                text={'Chỉnh sửa'}
                handleOnclick={handleEditClick}
              />
            </div>
          </>
        )}
      </Flex>

      <Divider />
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Space direction='vertical' size='middle'>
            <Text strong>Mã lô đất:</Text>
            <Text>{block?.blockCode}</Text>
            <Text strong>Giá:</Text>
            <Text>{block?.blockPrice.toLocaleString()} VND</Text>
            <Text strong>Số lượng lô đất:</Text>
            <Text>{block?.quantityBlock}</Text>
            <Text strong>Thời gian thuê:</Text>
            <Text>{block?.rentTimeByDay} ngày</Text>
            <Text strong>Người tạo:</Text>
            <Text>{block?.createdBy}</Text>
            <Text strong>Người cập nhật:</Text>
            <Text>{block?.lastUpdatedBy || 'Chưa cập nhật'}</Text>
            <Text strong>Người xóa:</Text>
            <Text>{block?.deletedBy || 'Không'}</Text>
            <Text strong>Trạng thái:</Text>
            <Text>{block?.isDeleted ? 'Đã xóa' : 'Còn hiệu lực'}</Text>
          </Space>
        </Col>
        <Col span={12}>
          <Space direction='vertical' size='middle'>
            <Text strong>Tên nông trại:</Text>
            <Text>{block?.farmResponse.farmName}</Text>
            <Text strong>Mã nông trại:</Text>
            <Text>{block?.farmResponse.farmCode}</Text>
            <Image
              src={block?.farmResponse.imagesUrl}
              alt={block?.farmResponse.farmName}
              style={{ width: '100%', borderRadius: '8px' }}
            />
          </Space>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <Text strong>Mô tả: </Text>
          <Text>{block?.blockDescription}</Text>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <Text strong>Thời gian tạo: </Text>
          <Text>{new Date(block?.createdTime).toLocaleString('vi-VN')}</Text>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Text strong>Thời gian cập nhật: </Text>
          <Text>
            {new Date(block?.lastUpdatedTime).toLocaleString('vi-VN')}
          </Text>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Text strong>Thời gian xóa: </Text>
          <Text>{new Date(block?.deletedTime).toLocaleString('vi-VN')}</Text>
        </Col>
      </Row>
      <Modal
        title='Cập nhật thông tin lô đất'
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout='vertical'>
          <Form.Item
            name='blockName'
            label='Tên lô đất'
            rules={[{ required: true, message: 'Vui lòng nhập tên lô đất' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='blockPrice'
            label='Giá'
            rules={[
              { required: true, message: 'Vui lòng nhập giá' },
              {
                validator: (_, value) =>
                  value && value > 1000
                    ? Promise.resolve()
                    : Promise.reject(new Error('Giá ô đất phải lớn hơn 1000đ')),
              },
            ]}
          >
            <Input type='number' />
          </Form.Item>
          <Form.Item name='blockDescription' label='Mô tả'>
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name='rentTimeByDay'
            label='Thời gian thuê (ngày)'
            rules={[
              { required: true, message: 'Vui lòng nhập thời gian thuê' },
            ]}
          >
            <Input type='number' />
          </Form.Item>
          <Form.Item
            name='farmID'
            label='Mã nông trại'
            rules={[{ required: true, message: 'Vui lòng nhập mã nông trại' }]}
          >
            <Select
              placeholder='Chọn nông trại'
              loading={isLoading}
              options={farms?.data?.map(farm => ({
                label: farm.farmName,
                value: farm.farmID,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default BlockUpdateForm;
