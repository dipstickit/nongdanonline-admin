import { useState, useRef } from "react"
import { useCreateBlogMutation } from "../../features/blogs/blogApi"
import { Form, Input, Button, Modal, notification } from 'antd'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './Blog.css'

export default function AddBlog() {
  const [createBlog] = useCreateBlogMutation()
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [quillValue, setQuillValue] = useState('')
  const reactQuillRef = useRef(null)
  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCancel = () => {
    setOpenModal(false);
  };

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const result = await createBlog(values).unwrap()
      const statusCode = result.statusCode
      setOpenModal(false)
      if (statusCode.toString().startsWith('2')) {
        notification.success({
          message: 'Thêm blog thành công!',
          description: 'Blog của bạn đã được thêm thành công.',
          showProgress: true,
        });
      } else {
        notification.error({
          message: 'Thêm blog thất bại!',
          description: 'Đã xảy ra lỗi khi thêm blog của bạn.',
          showProgress: true,
        });
      }
    } catch {
      notification.error({
        message: 'Thêm blog thất bại!',
        description: 'Đã xảy ra lỗi khi thêm blog của bạn.',
        showProgress: true,
      });
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='addModalBlog'>
      <Button type="primary" onClick={handleOpenModal}>
        Thêm Blog
      </Button>

      {openModal && (
        <Modal title="Thêm Blog"
          open={openModal}
          onCancel={handleCancel}
          footer={null}
          width={1000}
        >
          <Form onFinish={onFinish}>
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
                  Thêm
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  )
}