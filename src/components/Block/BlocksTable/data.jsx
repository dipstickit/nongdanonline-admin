// data.js or data.ts
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Button, Image, Popconfirm, Space } from 'antd';
import { Link } from 'react-router-dom';

export const columns = (handleEdit, handleDelete) => [
  {
    title: 'Tên ô đất',
    dataIndex: 'blockName',
    key: 'blockName',
    render: (_, record) => (
      <Link to={`/block/${record.blockID}`}>{record.blockName}</Link>
    ),
  },
  {
    title: 'Code',
    dataIndex: 'blockCode',
    key: 'blockCode',
  },
  {
    title: 'isDeleted',
    dataIndex: 'isDeleted',
    key: 'isDeleted',
    hidden: true,
  },
  {
    title: 'BlockId',
    dataIndex: 'blockID',
    key: 'blockID',
    hidden: true,
  },
  {
    title: 'Giá ô đất',
    dataIndex: 'blockPrice',
    key: 'blockPrice',
    render: price => `${price.toLocaleString()} VND`, // Format price
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantityBlock',
    key: 'quantityBlock',
  },
  {
    title: 'Thời gian thuê (ngày)',
    dataIndex: 'rentTimeByDay',
    key: 'rentTimeByDay',
  },
  {
    title: 'Tên nông trại',
    dataIndex: ['farmResponse', 'farmName'],
    key: 'farmName',
  },
  {
    title: 'Farm Code',
    dataIndex: ['farmResponse', 'farmCode'],
    key: 'farmCode',
  },
  {
    title: 'Hình ảnh',
    dataIndex: ['farmResponse', 'imagesUrl'],
    key: 'imagesUrl',
    render: url => <Image src={url} alt='Farm' style={{ width: '100px' }} />,
  },
  {
    title: 'Hành động',
    key: 'actions',
    render: (_, record) => {
      {
        return !record.isDeleted ? (
          <Space size='middle'>
            <Link to={`/block/${record.blockID}`}>
              <EditOutlined style={{ marginRight: 12, fontSize: 16 }} />
            </Link>
            <Popconfirm
              title='Xóa ô đất'
              description='Bạn có chắc chắn không?'
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              onConfirm={() => handleDelete(record.blockID)}
            >
              <Button>
                <DeleteOutlined
                  style={{ fontSize: 16, color: '#FF0404', cursor: 'pointer' }}
                />
              </Button>
            </Popconfirm>
          </Space>
        ) : (
          <span style={{ color: 'red' }}>Đã xóa</span>
        );
      }
    },
  },
];
