import { useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  Typography,
  Space,
  Divider,
  message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useCreateFarmMutation } from '../../../features/farms/farmApi';

const { TextArea } = Input;
const { Title } = Typography;

const normFile = e => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function AddFarmForm() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [createFarm, { isLoading, isSuccess, isError, error }] =
    useCreateFarmMutation();

  const submitForm = async values => {
    const payload = {
      FarmName: values.farmName,
      MapLink: values.mapLink,
      FarmArea: values.farmArea,
      FarmOwner: values.farmOwner,
      OwnerPhone: values.ownerPhone,
      FarmAddress: values.farmAddress,
      FarmDescription: values.farmDescription,
    };
    const res = await createFarm({ payload, images: values.images });
    if(isError){
    messageApi.error(`Có lỗi xảy ra`);
    }
    messageApi.success(`Nông trại đã tạo thành công.`);
  };

  return (
    <>
      <Space
        direction='vertical'
        style={{
          width: '100%',
          padding: '20px',
          maxWidth: '900px',
          margin: 'auto',
        }}
      >
        {contextHolder}

        <Title>Thêm nông trại</Title>
        <Divider />
        <Form
          form={form}
          layout='vertical'
          style={{
            background: '#FFF',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '-1px 2px 14px 1px rgba(0,0,0,0.15)',
          }}
          onFinish={submitForm}
        >
          <Form.Item
            label='Tên Nông Trại'
            name='farmName'
            rules={[{ required: true, message: 'Vui lòng nhập tên nông trại' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Đường Dẫn Bản Đồ'
            name='mapLink'
            rules={[
              { required: true, message: 'Vui lòng nhập Đường Dẫn Bản Đồ' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Diện Tích Nông Trại (m²)'
            name='farmArea'
            rules={[
              { required: true, message: 'Vui lòng nhập Diện Tích Nông Trại' },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label='Chủ Nông Trại'
            name='farmOwner'
            rules={[{ required: true, message: 'Vui lòng nhập Chủ Nông Trại' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Số Điện Thoại'
            name='ownerPhone'
            rules={[{ required: true, message: 'Vui lòng nhập Số Điện Thoại' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Địa Chỉ'
            name='farmAddress'
            rules={[{ required: true, message: 'Vui lòng nhập Địa Chỉ' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Mô Tả Nông Trại'
            name='farmDescription'
            rules={[{ required: true, message: 'Vui lòng nhập Mô Tả' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name='images'
            label='Thêm Ảnh'
            valuePropName='fileList'
            getValueFromEvent={normFile}
            rules={[{ required: true, message: 'Vui lòng cung cấp Ảnh' }]}
          >
            <Upload listType='picture-card' beforeUpload={() => false}>
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải Lên</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              style={{ width: '100%' }}
              loading={isLoading}
            >
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </>
  );
}
