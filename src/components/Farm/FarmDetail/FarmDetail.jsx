import React, { useEffect } from 'react';

import UpdateFarmForm from '../FarmForm/UpdateFarmForm';
import FarmInfo from './FarmInfo';
import { useGetFarmFullDetailQuery } from '../../../features/farms/farmApi';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { Flex, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import FarmDashboard from '../FarmDashboard/FarmDashboard';
import { useGetFarmRevenueQuery } from '../../../features/farms/farmAdminApi'

export default function FarmDetail() {
  const { farmSelectedId } = useOutletContext();
  const nav = useNavigate();
  //Get farmId
  const { farmId } = useParams();
  if (farmSelectedId && farmId !== farmSelectedId) {
    nav(`/farm/${farmSelectedId}`);
  }
  // get farm detail

  
  const data = useGetFarmFullDetailQuery(farmId);
  const revenue = useGetFarmRevenueQuery({farmId})
  console.log({data});
  
  const { isLoading, isError, isSuccess, error, refetch } = data;
  let detail;
  //prepare data for UpdateFarmForm component
  if (isSuccess) {
    const updateFormData = data.data.data;
    detail = {
      farmID: updateFormData?.farmID,
      farmName: updateFormData?.farmName,
      mapLink: updateFormData?.mapLink,
      farmArea: updateFormData?.farmArea,
      farmOwner: updateFormData?.farmOwner,
      ownerPhone: updateFormData?.ownerPhone,
      farmAddress: updateFormData?.farmAddress,
      farmDescription: updateFormData?.farmDescription,
      farmImages: updateFormData.farmImages,
      farmCode: updateFormData.farmCode,
      quantityBlock: updateFormData.blocks.length
    };
  }
  useEffect(() => {
    refetch();
  }, [farmId]);
  if (isLoading) {
    return (
      <Flex justify='center' align='center' style={{ height: '80vh' }}>
        <LoadingOutlined style={{ fontSize: 50 }} />
      </Flex>
    );
  }
  return (
    <>
      <FarmDashboard revenue={revenue}/>
      <Title level={2}>Chi tiết nông trại</Title>
      {detail && <UpdateFarmForm data={detail} />}
      <Typography.Title level={2}>Chi tiết ô đất và gia súc</Typography.Title>
      {isSuccess && <FarmInfo data={data.data.data} />}
    </>
  );
}
