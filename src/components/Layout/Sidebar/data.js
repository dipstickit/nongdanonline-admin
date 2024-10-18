import {
  HomeOutlined,
  BookOutlined,
  TransactionOutlined,
  UserOutlined,
} from '@ant-design/icons';

const data = [
  {
    name: 'Trang chủ',
    icon: HomeOutlined,
    path: '/',
  },
  {
    name: 'Quản lý người dùng',
    icon: UserOutlined,
    path: '/users',
  },
  {
    name: 'Quản lý trang trại',
    icon: HomeOutlined,
    path: '/farm',
  },
  {
    name: 'Quản lý bài blog',
    icon: BookOutlined,
    path: '/blogs',
  },
  {
    name: 'Quản lý động vật',
    icon: HomeOutlined,
    path: '/animal',
  },
  {
    name: 'Giao dịch',
    icon: TransactionOutlined,
    path: '/transaction',
  },
  {
    name: 'Quản lý Ô đất',
    icon: HomeOutlined,
    path: '/block',
  },
];

export default data;
