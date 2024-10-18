import { useState, useRef } from 'react'
import { useUpdateBlogMutation } from '../../features/blogs/blogApi'
import { Button, Modal, notification, Form, Input } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export const UpdateButton = (record) => {
  const [updateBlog] = useUpdateBlogMutation()
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [quillValue, setQuillValue] = useState(record.content)
  const reactQuillRef = useRef(null)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCancel = () => {
    setOpenModal(false);
  }

  const handleUpdate = async (values) => {
    setLoading(true);
    try {
      const result = await updateBlog({ data: values, id: record.record.blogID }).unwrap();
      const statusCode = result.statusCode;
      setOpenModal(false);
      if (statusCode.toString().startsWith('2')) {
        notification.success({
          message: 'Cập nhật blog thành công!',
          description: 'Blog của bạn đã được cập nhật thành công.',
          showProgress: true,
        });
      } else {
        notification.error({
          message: 'Cập nhật blog thất bại!',
          description: 'Đã xảy ra lỗi khi cập nhật blog của bạn.',
          showProgress: true,
        });
      }
    } catch {
      notification.error({
        message: 'Cập nhật blog thất bại!',
        description: 'Đã xảy ra lỗi khi cập nhật blog của bạn.',
        showProgress: true,
      })
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={handleOpenModal} />

      {openModal && (
        <Modal title="Thêm Blog"
          open={openModal}
          onCancel={handleCancel}
          footer={null}
          width={1000}
        >
          <Form
            initialValues={record.record}
            onFinish={handleUpdate}
          >
            <Form.Item
              label="Tiêu đề"
              name="title"
              rules={[{ required: true, message: 'Hãy nhập tiêu đề!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Nội dung"
              name="content"
              rules={[{ required: true, message: 'Hãy nhập nội dung' }]}
            >
              <ReactQuill
                ref={reactQuillRef}
                theme="snow"
                placeholder="Nhập nội dung"
                modules={{
                  toolbar: {
                    container: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ size: [] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      ["link", "image", "video"],
                      ["code-block"],
                      ["clean"],
                    ],
                  },
                  clipboard: {
                    matchVisual: false,
                  },
                }}
                formats={[
                  "header",
                  "font",
                  "size",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "blockquote",
                  "list",
                  "bullet",
                  "indent",
                  "link",
                  "image",
                  "video",
                  "code-block",
                ]}
                value={quillValue}
                onChange={setQuillValue}
              />
            </Form.Item>
            <Form.Item
              label="Link video"
              name="linkVideo"
              rules={[
                { required: true, message: 'Hãy nhập link video!' },
                {
                  pattern: new RegExp(
                    /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i
                  ),
                  message: 'Hãy nhập một link video hợp lệ!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <div className="addFormButton">
                <Button type="primary" danger onClick={handleCancel}>
                  Hủy
                </Button>
                <Button type="primary" htmlType="submit" className="addButton" loading={loading}>
                  Cập nhật
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  )
}