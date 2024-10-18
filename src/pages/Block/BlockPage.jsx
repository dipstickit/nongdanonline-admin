import React from 'react';
import BlocksTable from '../../components/Block/BlocksTable/BlocksTable';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';
import Title from 'antd/es/typography/Title';
import CustomButton from '../../components/Button/CustomButton';

export default function BlockPage() {
  const nav = useNavigate();
  return (
    <>
      <Title>Quản lý ô đất</Title>
      <Flex justify='end'>
        <CustomButton
          text={'Thêm Ô đất'}
          styles={{ marginBottom: 27 }}
          handleOnclick={() => nav('/block/create')}
        />
      </Flex>
      <BlocksTable />
    </>
  );
}
