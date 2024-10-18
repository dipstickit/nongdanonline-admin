// import { Form, Input, Modal } from 'antd';
// import React from 'react';


// export default function BlockUpdateModal({ block, isModalOpen,setIsModalOpen }) {

//   const [form] = Form.useForm();

//   return (
//     <div>
//       <Modal
//         title='Cập nhật thông tin lô đất'
//         visible={isModalOpen}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <Form form={form} layout='vertical'>
//           <Form.Item
//             name='blockName'
//             label='Tên lô đất'
//             rules={[{ required: true, message: 'Vui lòng nhập tên lô đất' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name='blockPrice'
//             label='Giá'
//             rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
//           >
//             <Input type='number' />
//           </Form.Item>
//           <Form.Item name='blockDescription' label='Mô tả'>
//             <Input.TextArea />
//           </Form.Item>
//           <Form.Item
//             name='rentTimeByDay'
//             label='Thời gian thuê (ngày)'
//             rules={[
//               { required: true, message: 'Vui lòng nhập thời gian thuê' },
//             ]}
//           >
//             <Input type='number' />
//           </Form.Item>
//           <Form.Item
//             name='farmID'
//             label='Mã nông trại'
//             rules={[{ required: true, message: 'Vui lòng nhập mã nông trại' }]}
//           >
//             <Input />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// }
