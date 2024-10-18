import { useState } from 'react';
import { useDeleteBlogMutation } from '../../features/blogs/blogApi';
import { Popconfirm, Button, notification } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'

export const DeleteButton = (record) => {
  const [deleteBlog] = useDeleteBlogMutation()
  const [loading, setLoading] = useState(false)

  const confirm = async (values) => {
    setLoading(true)
    try {
      const result = await deleteBlog(values.record.blogID).unwrap()
      const statusCode = result.statusCode
      if (statusCode.toString().startsWith('2')) {
        notification.success({
          message: 'Xóa blog thành công!',
          description: 'Blog của bạn đã được Xóa thành công.',
          showProgress: true,
        });
      } else {
        notification.error({
          message: 'Xóa blog thất bại!',
          description: 'Đã xảy ra lỗi khi Xóa blog của bạn.',
          showProgress: true,
        });
      }
    } catch {
      notification.error({
        message: 'Xóa blog thất bại!',
        description: 'Đã xảy ra lỗi khi Xóa blog của bạn.',
        showProgress: true,
      });
    } finally {
      setLoading(false)
    }
  }

  const cancel = () => {
    notification.error({
      message: 'Xóa blog không thành công!',
      description: 'Bạn đã hủy xóa blog của mình.',
      showProgress: true,
    });
  }


  return (
    <Popconfirm
      title="Xác nhận xóa blog này?"
      description="Blog của bạn sẽ bị xóa vĩnh viễn."
      onConfirm={() => confirm(record)}
      onCancel={cancel}
      okText="Đồng ý"
      cancelText="Hủy"
      loading={loading}
    >
      <Button
        type="text"
        danger
        icon={<DeleteOutlined />}
      />
    </Popconfirm>
  )
}