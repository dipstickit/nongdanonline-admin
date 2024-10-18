import React from 'react';
import FarmTable from '../../components/Farm/FarmTable/FarmTable';
import {
  useGetFarmFullDetailQuery,
  useGetFarmListQuery,
} from '../../features/farms/farmApi';
import { LoadingOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { Flex } from 'antd';
import CustomButton from '../../components/Button/CustomButton';
import { useNavigate } from 'react-router-dom';

const FarmPage = () => {
  const nav = useNavigate();
  const farms = useGetFarmListQuery();
  let farmsData;

  if (farms.isLoading) {
    return (
      <Flex justify='center' align='center' style={{ height: '80vh' }}>
        <LoadingOutlined style={{ fontSize: 50 }} />
      </Flex>
    );
  } else if (farms.isSuccess) {
  
    farmsData = farms?.data?.data.map((farm, index) => ({
      index: index + 1,
      farmId: farm.farmID,
      key: farm.farmID,
      img: farm.farmImages[0].imagesUrl,
      name: farm.farmName,
      code: farm.farmCode,
      area: farm.farmArea,
      farmOwner: farm.farmOwner,
    }));
  } else if (farms.isError) {
    return <div>{farms.error}</div>;
  }

  return (
    <div>
      <Title>Quản lý nông trại</Title>
      <Flex justify='end'>
        <CustomButton
          text={'Thêm farm'}
          styles={{ marginBottom: 27 }}
          handleOnclick={() => nav('/farm/create')}
        />
      </Flex>
      <FarmTable farms={farmsData} />
    </div>
  );
};

export default FarmPage;
