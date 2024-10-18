import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import { columns } from './data';

const TransactionTable = ({ transData }) => {
  const transAllData = transData?.items;

  return (
    <div style={{ marginTop: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type='primary' style={{ background: '#2FB95D' }}>
          <PlusCircleOutlined color='#fff' />
          Thêm giao dịch
        </Button>
      </div>
      <Table
        style={{ marginTop: '20px' }}
        columns={columns}
        dataSource={transAllData}
        rowKey='transactionDate'
      >
        TransactionTable
      </Table>
    </div>
  );
};

export default TransactionTable;
