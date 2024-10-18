import { Col, Row } from 'antd';
import CardItem from './CardItem';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  WalletOutlined,
} from '@ant-design/icons';

import './Card.css';

const TransactionCardList = ({ transFullData }) => {
  const cardData = [
    {
      title: 'Giao dịch thành công',
      value: transFullData?.successTransactions,
      icon: CheckCircleOutlined,
      color: '#2FB95D',
      bgIcon: '#E6FFFB',
    },
    {
      title: 'Giao dịch thất bại',
      value: transFullData?.failedTransactions,
      icon: CloseCircleOutlined,
      color: '#FF4D4F',
      bgIcon: '#FFF1F0',
    },
    {
      title: 'Giao dịch chờ xác nhận',
      value: transFullData?.pendingTransactions,
      icon: ClockCircleOutlined,
      color: '#FAAD14',
      bgIcon: '#FFF7E6',
    },
    {
      title: 'Tổng số giao dịch',
      value: transFullData?.totalTransactions,
      icon: WalletOutlined,
      color: '#1890FF',
      bgIcon: '#E6F7FF',
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {cardData.map((card, index) => (
        <Col span={6} key={index}>
          <CardItem card={card} />
        </Col>
      ))}
    </Row>
  );
};

export default TransactionCardList;
