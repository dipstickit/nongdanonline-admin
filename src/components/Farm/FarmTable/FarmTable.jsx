import {
  Button,
  ConfigProvider,
  message,
  Popconfirm,
  Table,
  Typography,
} from 'antd';

import { farmColumns as column } from './data';
import { useDeleteFarmMutation, useGetFarmFullDetailQuery} from '../../../features/farms/farmApi'
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Link, useOutletContext } from 'react-router-dom';


const FarmTable = ({ farms }) => {
  const {farmSelectedId} = useOutletContext()

  

  //Delete Farm Feature
  const [deleteFarm] = useDeleteFarmMutation();

  const handleDelete = async id => {
    //popsup

    await deleteFarm(id).unwrap();
  };
  const farmColumns = [
    ...column,
    //Assign colummn with delete action and update
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <>
          <Link to={`/farm/${record.farmId}`}>
            <EditOutlined style={{ marginRight: 12, fontSize: 16 }} />
          </Link>
          <Popconfirm
            title='Delete the task'
            description='Are you sure to delete this task?'
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => handleDelete(record.farmId)}
          >
            <Button>
              <DeleteOutlined
                style={{ fontSize: 16, color: '#FF0404', cursor: 'pointer' }}
              />
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  //Filter data source with filter in navbar
  let farmsDataSource = !farmSelectedId ? farms : farms?.filter(farm => farm.farmId === farmSelectedId);
  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              /* here is your component tokens */
              colorTextHeading: '#2FB95D',
              headerBg: '#EBF6EB',
            },
          },
        }}
      >
        <Table columns={farmColumns} dataSource={farmsDataSource} />
      </ConfigProvider>

    </div>
  );
};

export default FarmTable;
