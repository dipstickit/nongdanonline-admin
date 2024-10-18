import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Typography, message, Select } from 'antd';
import { useAddBlockMutation } from '../../../features/blocks/blocksApi';
import { useGetFarmListQuery } from '../../../features/farms/farmApi';

const { Title } = Typography;

export default function BlockAddForm() {
  const [form] = Form.useForm();
  const [addBlock, { isLoading, isError, error, isSuccess }] =
    useAddBlockMutation();
  const { data: farms, isLoading: isFarmsLoading } = useGetFarmListQuery();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async values => {
    try {
    //  console.log({ values });
      await addBlock({
        ...values,
        animalTypeID: '5f851b61-bbca-4c9c-8a4b-a8b550efb48e',
      });

      // form.resetFields();
    } catch (error) {
      messageApi.error('Có lỗi xảy ra khi thêm lô đất.');
    }
  };
  useEffect(() => {
    if (isSuccess) {
      messageApi.success('Lô đất đã được thêm thành công!');
      // form.resetFields(); // Reset form after success
    }
    if (isError) {
      messageApi.error(error.data.message);
    }
  }, [isSuccess, isError]);

  if (isError) {
    console.log(error);
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', marginTop: '20px' }}>
      {contextHolder}
      <Title level={3}>Thêm Lô Đất</Title>
      <Form form={form} layout='vertical' onFinish={onFinish}>
        <Form.Item
          name='blockName'
          label='Tên lô đất'
          rules={[{ required: true, message: 'Vui lòng nhập tên lô đất!' }]}
        >
          <Input placeholder='Nhập tên lô đất' />
        </Form.Item>

        <Form.Item
          name='blockPrice'
          label='Giá lô đất'
          rules={[
            { required: true, message: 'Vui lòng nhập giá lô đất!' },
            {
              validator: (_, value) =>
                value && value > 1000
                  ? Promise.resolve()
                  : Promise.reject(new Error('Giá ô đất phải lớn hơn 1000đ')),
            },
          ]}
        >
          <Input type='number' placeholder='Nhập giá lô đất' />
        </Form.Item>

        <Form.Item
          name='blockDescription'
          label='Mô tả lô đất'
          rules={[{ required: true, message: 'Vui lòng nhập mô tả lô đất!' }]}
        >
          <Input.TextArea placeholder='Nhập mô tả lô đất' rows={4} />
        </Form.Item>

        <Form.Item
          name='rentTimeByDay'
          label='Thời gian thuê (ngày)'
          rules={[{ required: true, message: 'Vui lòng nhập thời gian thuê!' }]}
        >
          <Input type='number' placeholder='Nhập thời gian thuê' />
        </Form.Item>

        <Form.Item
          name='farmID'
          label='ID Nông Trại'
          rules={[{ required: true, message: 'Vui lòng chọn nông trại!' }]}
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

        <Form.Item>
          <Button type='primary' htmlType='submit' loading={isLoading}>
            Thêm Lô Đất
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
