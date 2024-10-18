import React, { useState } from 'react';
import { Table, Button, Input, Select, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './Animal.css';

const { Option } = Select;
const { Title } = Typography;

const Animal = () => {
  const [animals, setAnimals] = useState([
    {
      key: '1',
      image: 'Animal 1',
      code: 'ANM01',
      name: 'Animal 1',
      area: 20,
      type: 'Type 1',
    },
    // Add more sample data as needed
  ]);

  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Diện tích',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: 'Loại động vật',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div>
          <Button
            type="primary"
            icon={<EditOutlined />}
            style={{ marginRight: 8, backgroundColor: 'limegreen', borderColor: 'limegreen', fontWeight: '500' }}
          />
          <Button type="danger" icon={<DeleteOutlined />} />
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      {/* Header Section */}
      <Title level={3} style={{ marginBottom: '16px' }}>
        Quản lý động vật
      </Title>

      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
        {/* Filter Inputs */}
        <div>
          <Input placeholder="FarmCode: Còn trống" style={{ width: 200, marginRight: 8 }} />
          <Select defaultValue="Tất cả" style={{ width: 120 }}>
            <Option value="empty">Còn trống</Option>
            <Option value="full">Đã đủ</Option>
          </Select>
        </div>

        {/* Add Animal Button */}
        <Button type="primary" style={{ backgroundColor: 'limegreen', borderColor: 'limegreen', fontWeight: '500' }}>
          Thêm animal
        </Button>
      </div>

      {/* Animal Table */}
      <Table
        columns={columns}
        dataSource={animals}
        pagination={{
          current: 1,
          pageSize: 5,
          total: 100,
          showSizeChanger: false,
          position: ['bottomCenter'],
        }}
      />
    </div>
  );
};

export default Animal;
