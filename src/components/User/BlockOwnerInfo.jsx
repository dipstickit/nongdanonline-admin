// src/components/User/BlockOwnerInfo.jsx
import React, { useState, useEffect } from 'react';
import { useGetBlockOwnerByUserQuery } from '../../features/users/userApi';
import {
  Table,
  Spin,
  Alert,
  Typography,
  Tag,
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Space,
  message,
  Modal,
} from 'antd';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';
import AnimalDetailsModal from './AnimalDetailsModal';
import debounce from 'lodash/debounce';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const BlockOwnerInfo = ({ userId }) => {
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    blockCode: '',
    startDate: '',
    endDate: '',
    isAvailable: '',
    status: '',
  });
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const { data, isLoading, isError, refetch } = useGetBlockOwnerByUserQuery({
    userId,
    pageIndex: currentPage,
    pageSize: 8,
    ...filters,
  });

  useEffect(() => {
    refetch();
  }, [filters, currentPage, refetch]);

  const debouncedFilterChange = debounce(values => {
    setFilters({
      ...filters,
      ...values,
      startDate: values.dateRange
        ? values.dateRange[0].format('YYYY-MM-DD')
        : '',
      endDate: values.dateRange ? values.dateRange[1].format('YYYY-MM-DD') : '',
    });
    setCurrentPage(1);
  }, 300);

  const handleFilterChange = values => {
    debouncedFilterChange(values);
    setIsFilterModalVisible(false);
  };

  const handleReset = () => {
    form.resetFields();
    setFilters({
      blockCode: '',
      startDate: '',
      endDate: '',
      isAvailable: '',
      status: '',
    });
    setCurrentPage(1);
    message.success('Filters have been reset');
  };

  const showAnimalDetails = animal => {
    setSelectedAnimal(animal);
    setIsModalVisible(true);
  };

  if (isLoading) return <Spin size='large' />;
  if (isError)
    return <Alert message='Error loading block information' type='error' />;

  const columns = [
    {
      title: 'Block Code',
      dataIndex: 'blockUserCode',
      key: 'blockUserCode',
      sorter: (a, b) => a.blockUserCode.localeCompare(b.blockUserCode),
    },
    {
      title: 'Ngày Bắt Đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      render: date => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
    },
    {
      title: 'Ngày Kết Thúc (Dự Kiến)',
      dataIndex: 'endDate',
      key: 'endDate',
      render: date => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.endDate) - new Date(b.endDate),
    },
    {
      title: 'Ô đất',
      dataIndex: 'isAvailable',
      key: 'isAvailable',
      render: isAvailable => (
        <Tag color={isAvailable ? 'green' : 'red'}>
          {isAvailable ? 'Đang Nuôi' : 'Trống'}
        </Tag>
      ),
      filters: [
        { text: 'Đang Nuôi', value: true },
        { text: 'Trống', value: false },
      ],
      onFilter: (value, record) => record.isAvailable === value,
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={status ? 'green' : 'red'}>
          {status ? 'Đang dùng' : 'Hết Hạn'}
        </Tag>
      ),
      filters: [
        { text: 'Đang dùng', value: true },
        { text: 'Hết Hạn', value: false },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Giá',
      dataIndex: 'blockPrice',
      key: 'blockPrice',
      sorter: (a, b) => a.blockPrice - b.blockPrice,
    },
    {
      title: 'Loại Động Vật',
      dataIndex: 'animalTypeName',
      key: 'animalTypeName',
      filters: [
        ...new Set(data?.data?.items.map(item => item.animalTypeName)),
      ].map(type => ({ text: type, value: type })),
      onFilter: (value, record) => record.animalTypeName === value,
    },
    {
      title: 'Vật Nuôi',
      dataIndex: 'animalOwnerUsers',
      key: 'animalInfo',
      render: animalOwnerUsers => (
        <Space direction='vertical'>
          {animalOwnerUsers.map((animal, index) => (
            <Button
              key={index}
              type='link'
              onClick={() => showAnimalDetails(animal)}
            >
              {animal.animalName}
            </Button>
          ))}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={4}>Thông tin Block</Title>
      <Button
        onClick={() => setIsFilterModalVisible(true)}
        type='primary'
        style={{ marginBottom: 16 }}
      >
        Mở bộ lọc
      </Button>
      <Modal
        title='Bộ lọc'
        visible={isFilterModalVisible}
        onCancel={() => setIsFilterModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form form={form} layout='vertical' onFinish={handleFilterChange}>
          <Form.Item name='blockCode' label='Block Code'>
            <Input placeholder='Block Code' allowClear />
          </Form.Item>
          <Form.Item name='dateRange' label='Khoảng thời gian'>
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name='isAvailable' label='Trạng thái ô đất'>
            <Select placeholder='Availability' allowClear>
              <Select.Option value='true'>Đang Nuôi</Select.Option>
              <Select.Option value='false'>Trống</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name='status' label='Trạng thái sử dụng'>
            <Select placeholder='Status' allowClear>
              <Select.Option value='true'>Đang Dùng</Select.Option>
              <Select.Option value='false'>Hết Hạn</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button
                type='primary'
                htmlType='submit'
                icon={<SearchOutlined />}
              >
                Tìm kiếm
              </Button>
              <Button onClick={handleReset} icon={<ClearOutlined />}>
                Đặt lại
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={data?.data?.items}
        rowKey='blockOwnerUserID'
        pagination={{
          total: data?.data?.totalItems,
          pageSize: data?.data?.pageSize,
          current: currentPage,
          onChange: page => setCurrentPage(page),
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        scroll={{ x: 'max-content' }}
      />
      <AnimalDetailsModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        animal={selectedAnimal}
      />
    </div>
  );
};

export default BlockOwnerInfo;
