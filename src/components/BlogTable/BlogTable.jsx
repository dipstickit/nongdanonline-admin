import { useState } from 'react';
import { Table, Select, Input, Form } from "antd"
import { SearchOutlined } from '@ant-design/icons'
import { useGetBlogListQuery } from '../../features/blogs/blogApi'
import './Blog.css'
import { pageSizeOptions, columns } from '../BlogTable/data'

export default function BlogTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchKeyWord, setSearchKeyWord] = useState('')
  const { data: blogs, error, isLoading } = useGetBlogListQuery({ searchKeyWord: searchKeyWord, pageNumber: currentPage, pageSize: pageSize })

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination)
  }

  const handleChangePageSize = (value) => {
    setPageSize(value)
    setCurrentPage(1)
  }

  const handleSearch = (values) => {
    setSearchKeyWord(values.search);
  };

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  const dataSource = blogs.data.items.map(blog => ({
    blogID: blog.blogID,
    title: blog.title,
    content: blog.content,
    linkVideo: blog.linkVideo,
    authorId: blog.authorID,
  }))

  return (
    <>
      <div className='selectBlogTable'>
        <Select
          defaultValue="10"
          style={{
            width: 150,
            height: 40,
          }}
          onChange={handleChangePageSize}
          options={pageSizeOptions}
        />
        <Form onFinish={handleSearch}>
          <Form.Item name="search">
            <Input
              placeholder="Tìm kiếm theo tiêu đề"
              prefix={<SearchOutlined />}
              style={{
                width: 250,
                height: 40,
              }}
            />
          </Form.Item>
        </Form>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        className="custom-table"
        pagination={{
          current: blogs?.data?.currentPage || 1,
          pageSize: blogs?.data?.pageSize || pageSize,
          total: blogs?.data?.totalItems || 0,
          onChange: handleTableChange,
        }}
      />
    </>
  )
}
