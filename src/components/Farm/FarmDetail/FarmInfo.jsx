import React from 'react';
import { Collapse, Card, Table, Image } from 'antd';
import { Link } from 'react-router-dom';

const { Panel } = Collapse;

const FarmInfo = ({ data }) => {


  // Columns for blocks table
  const blockColumns = [
    {
      title: 'Tên ô đất',
      dataIndex: 'blockName',
      key: 'blockName',
      render: (_, record) => <Link to={`/block/${record.blockID}`}>{record.blockName}</Link>,
    },
    { title: 'Giá', dataIndex: 'blockPrice', key: 'blockPrice' },
    {
      title: 'Miêu tả',
      dataIndex: 'blockDescription',
      key: 'blockDescription',
    },
    {
      title: 'Thời gian thuê (ngày)',
      dataIndex: 'rentTimeByDay',
      key: 'rentTimeByDay',
    },
    {
      title: 'Loại gia súc',
      dataIndex: 'animalTypeName',
      key: 'animalTypeName',
    },
    { title: 'Mã gia súc', dataIndex: 'animalTypeCode', key: 'animalTypeCode' },
  ];

  // Columns for animals table
  const animalColumns = [
    { title: 'Tên gia súc', dataIndex: 'animalName', key: 'animalName' },
    { title: 'Code', dataIndex: 'animalCode', key: 'animalCode' },
    {
      title: 'Miêu tả',
      dataIndex: 'animalDescription',
      key: 'animalDescription',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: text => (
        <Image src={text} alt='Animal' style={{ width: '100px' }} />
      ),
    },
  ];

  return (
    <Collapse defaultActiveKey={['1']} size='large'>
      <Panel header='Ô Đất' key='1'>
        <Table
          dataSource={data.blocks}
          columns={blockColumns}
          rowKey='blockID'
          pagination={false}
        />
      </Panel>
      <Panel header='Gia súc' key='2'>
        {data.animals.map(animal => (
          <Card
            key={animal.animalID}
            title={animal.animalName}
            style={{ marginBottom: '16px' }}
          >
            <Table
              dataSource={[animal]}
              columns={animalColumns}
              pagination={false}
              rowKey='animalID'
            />
            <Collapse defaultActiveKey={['1']} accordion>
              <Panel header='Care Packages' key='1'>
                <Table
                  dataSource={animal.carePackages}
                  columns={[
                    {
                      title: 'Gói chăm sóc',
                      dataIndex: 'carePackageName',
                      key: 'carePackageName',
                    },
                    {
                      title: 'Code',
                      dataIndex: 'carePackageCode',
                      key: 'carePackageCode',
                    },
                    {
                      title: 'Miêu tả',
                      dataIndex: 'carePackageDescription',
                      key: 'carePackageDescription',
                    },
                    {
                      title: 'Giá',
                      dataIndex: 'carePackagePrice',
                      key: 'carePackagePrice',
                    },
                    {
                      title: 'Hình ảnh',
                      dataIndex: 'carePackageImages',
                      key: 'carePackageImages',
                      render: text => (
                        <Image
                          src={text}
                          alt='Package'
                          style={{ width: '100px' }}
                        />
                      ),
                    },
                    {
                      title: 'Thời gian (ngày)',
                      dataIndex: 'timeUseByDay',
                      key: 'timeUseByDay',
                    },
                  ]}
                  rowKey='carePackageID'
                  pagination={false}
                />
              </Panel>
            </Collapse>
          </Card>
        ))}
      </Panel>
    </Collapse>
  );
};

export default FarmInfo;
