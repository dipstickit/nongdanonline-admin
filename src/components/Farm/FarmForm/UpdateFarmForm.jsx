import { useEffect, useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Col,
  Row,
  Upload,
  Image,
  Button,
  Divider,
  Typography,
  Card,
  Space,
  Carousel,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CustomButton from '../../Button/CustomButton';
import { useUpdateFarmMutation } from '../../../features/farms/farmApi';
const { TextArea } = Input;
const { Title } = Typography;

const normFile = e => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function FarmForm({ data }) {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [form] = Form.useForm();
  const [farmImages, setFarmImages] = useState();
  const [updateFarm, { isLoading }] = useUpdateFarmMutation();

  // Khi data thay đổi, cập nhật giá trị cho form
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        farmName: data.farmName,
        mapLink: data.mapLink,
        farmArea: data.farmArea,
        farmOwner: data.farmOwner,
        ownerPhone: data.ownerPhone,
        farmAddress: data.farmAddress,
        farmDescription: data.farmDescription,
      });
    }
  }, [data, form]);

  const handleOnclickChange = () => {
    setComponentDisabled(!componentDisabled);
  };

  const submitForm = async values => {
    const formData = new FormData();

    // Prepare the payload
    const payload = {
      id: data.farmID,
      FarmName: values.farmName,
      MapLink: values.mapLink,
      FarmArea: values.farmArea,
      FarmOwner: values.farmOwner,
      OwnerPhone: values.ownerPhone,
      FarmAddress: values.farmAddress,
      FarmDescription: values.farmDescription,
    };

    const res = await updateFarm({ payload, image: farmImages }).unwrap();
    console.log(res);
  };


  return (
    <Space
      direction='vertical'
      style={{
        width: '100%',
        padding: '20px',
        maxWidth: '900px',
        margin: 'auto',
      }}
    >
      <Carousel arrows style={{ width: '70%' }}>
        {
          data?.farmImages.map((img, i) => (
            <div key={i}>
              <Image src={img.imagesUrl} width='100%' />
            </div>
          ))
        }
      </Carousel>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '20px 0',
        }}
      >
        <CustomButton
          text={componentDisabled ? 'Chỉnh Sửa Nông Trại' : 'Hủy Sửa Đổi'}
          styles={{
            backgroundColor: !componentDisabled ? '#FF4D4F' : '#52C41A',
          }}
          handleOnclick={handleOnclickChange}
        />
      </div>
      <Divider />
      <Form
        form={form}
        initialValues={{
          farmName: data?.farmName,
          mapLink: data?.mapLink,
          farmArea: data?.farmArea,
          farmOwner: data?.farmOwner,
          ownerPhone: data?.ownerPhone,
          farmAddress: data?.farmAddress,
          farmDescription: data?.farmDescription,
        }}
        layout='vertical'
        disabled={componentDisabled}
        style={{
          background: '#FFF',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '-1px 2px 14px 1px rgba(0,0,0,0.15)',
        }}
        onFinish={submitForm}
      >
        <Form.Item label='Mã Nông Trại'>
          <Input
            value={data?.farmID}
            readOnly
            style={{ cursor: 'not-allowed' }}
          />
        </Form.Item>
        <Form.Item label='Mã Code'>
          <Input
            value={data?.farmCode}
            readOnly
            style={{ cursor: 'not-allowed' }}
          />
        </Form.Item>
        <Form.Item label='Tên Nông Trại' name='farmName'>
          <Input />
        </Form.Item>
        <Form.Item label='Đường Dẫn Bản Đồ' name='mapLink'>
          <Input />
        </Form.Item>
        <Form.Item label='Diện Tích Nông Trại (m²)' name='farmArea'>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label='Chủ Nông Trại' name='farmOwner'>
          <Input />
        </Form.Item>
        <Form.Item label='Số Điện Thoại' name='ownerPhone'>
          <Input />
        </Form.Item>
        <Form.Item label='Địa Chỉ' name='farmAddress'>
          <Input />
        </Form.Item>
        <Form.Item label='Mô Tả Nông Trại' name='farmDescription'>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label='Số Ô Đất'>
          <Input
            value={data?.quantityBlock}
            readOnly
            style={{ cursor: 'not-allowed' }}
          />
        </Form.Item>
        <Form.Item
          name='uploadedImage'
          label='Thêm Ảnh'
          valuePropName='fileList'
          getValueFromEvent={normFile}
        >
          <Upload
            listType='picture-card'
            beforeUpload={() => false}
            onChange={({ fileList }) => setFarmImages(fileList)}
          >
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
  );
}
