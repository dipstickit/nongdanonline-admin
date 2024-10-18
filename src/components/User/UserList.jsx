import React, { useState, useEffect } from 'react';
import {
  Table,
  Avatar,
  Tag,
  Input,
  Spin,
  Alert,
  Typography,
  Space,
  Modal,
} from 'antd';
import {
  useGetAllUsersQuery,
  useGetBlockOwnerByUserQuery,
} from '../../features/users/userApi';
import BlockOwnerInfo from './BlockOwnerInfo';

const { Search } = Input;
const { Title } = Typography;

const UserList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    blockCode: '',
    startDate: null,
    endDate: null,
    isAvailable: null,
    status: null,
  });

  const {
    data: userData,
    isLoading,
    isError,
  } = useGetAllUsersQuery({
    pageIndex: 1,
    pageSize: 1000, // Load all users at once
    searchTerm: '',
  });

  useEffect(() => {
    if (userData?.data?.items) {
      const filtered = userData.data.items.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [userData, searchTerm]);

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: avatar => <Avatar src={avatar} size='large' />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: phoneNumber =>
        phoneNumber || <Tag color='orange'>Not provided</Tag>,
    },
    {
      title: 'Default Address',
      dataIndex: 'userAddresses',
      key: 'defaultAddress',
      render: userAddresses => {
        const defaultAddress = userAddresses?.find(addr => addr.isdefault);
        return defaultAddress ? (
          <Space direction='vertical' size='small'>
            <div>{defaultAddress.name}</div>
            <div>{defaultAddress.address}</div>
            <div>{defaultAddress.phone}</div>
          </Space>
        ) : (
          <Tag color='red'>No default address</Tag>
        );
      },
    },
  ];

  const handleTableChange = pagination => {
    setCurrentPage(pagination.current);
  };

  const handleSearch = value => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleRowClick = record => {
    setSelectedUserId(record.id);
    setIsModalVisible(true);
  };

  return (
    <div>
      <Title level={2}>User List</Title>
      <Search
        placeholder='Search users by name'
        onSearch={handleSearch}
        style={{ marginBottom: 16 }}
        allowClear
      />
      {isError ? (
        <Alert
          message='Error'
          description='Failed to load users. Please try again later.'
          type='error'
          showIcon
        />
      ) : (
        <Spin spinning={isLoading}>
          <Table
            columns={columns}
            dataSource={filteredUsers}
            rowKey='id'
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: filteredUsers.length,
              onChange: handleTableChange,
              showSizeChanger: false,
              showQuickJumper: true,
            }}
            scroll={{ x: 'max-content' }}
            onRow={record => ({
              onClick: () => handleRowClick(record),
            })}
          />
        </Spin>
      )}
      <Modal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={1500}
      >
        <BlockOwnerInfo userId={selectedUserId} />
      </Modal>
    </div>
  );
};

export default UserList;
