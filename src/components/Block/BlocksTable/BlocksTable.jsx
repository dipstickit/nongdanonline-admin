import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';

import { columns } from './data';

import { useOutletContext } from 'react-router-dom';
import {
  useDeleteBlockMutation,
  useGetBlockByFarmIdQuery,
  useGetBlockQuery,
} from '../../../features/blocks/blocksApi';

const BlocksTable = () => {
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [pageSize, setPageSize] = useState(7); // Set page size
  const { farmSelectedId } = useOutletContext();

  const [deleteBlock] = useDeleteBlockMutation();
  // get all block
  const { data, isLoading, isError } = useGetBlockQuery({
    index: currentPage || 1,
    pageSize: pageSize || 7,
  });

  //get block by farm id if farmSelectedId
  const {data: blockByFarmId, isLoading: isBlockLoading} = useGetBlockByFarmIdQuery(farmSelectedId)
  console.log({blockByFarmId});
  let blockDataSource = farmSelectedId
  ? blockByFarmId
  : data?.items;
  

  const handleEdit = record => {
    message.info(`Editing ${record.blockName}`);
  };

  const handleDelete = async blockID => {
    console.log(blockID);
    const res = await deleteBlock(blockID);
    console.log(res);
  };

  // Handle pagination change
  const handleTableChange = pagination => {
    setCurrentPage(pagination);
  };
  useEffect(()=>{
    setCurrentPage(1)
  }, [farmSelectedId])
  if (isError) {
    return <div>Có lỗi xảy ra</div>;
  } 
  return (
    <Table
      columns={columns(handleEdit, handleDelete)}
      dataSource={blockDataSource}
      rowKey='blockID'
      pagination={{
        current: currentPage,
        total: farmSelectedId ? blockDataSource?.length : data?.totalItems,
        pageSize:  pageSize,
        onChange: handleTableChange, // Handle page change
      }}
      loading={isLoading || isBlockLoading}
    />
    
  );
};

export default BlocksTable;
