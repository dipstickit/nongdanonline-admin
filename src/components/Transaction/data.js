import { formatUTCDate } from '../../utils/helpers';

const columns = [
  {
    title: '#',
    dataIndex: 'index',
    key: 'index',
    align: 'center',
    width: '5%',
    render: (text, record, index) => index + 1,
  },
  {
    title: 'Customer',
    dataIndex: 'name',
    key: 'name',
    width: '20%',
  },
  {
    title: 'Amount',
    dataIndex: 'transactionAmount',
    key: 'transactionAmount',
    width: '10%',
    render: text =>
      new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(text),
  },
  {
    title: 'Status',
    dataIndex: 'transactionStatus',
    key: 'transactionStatus',
    align: 'center',
    width: '10%',
  },
  {
    title: 'Date',
    dataIndex: 'transactionDate',
    key: 'transactionDate',
    width: '50%',
    render: text => formatUTCDate(text),
  },
  {
    title: '',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
  },
];

export { columns };
