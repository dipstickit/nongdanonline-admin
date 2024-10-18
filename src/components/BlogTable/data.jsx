import { DeleteButton } from './DeleteButton'
import { UpdateButton } from './UpdateButton'
export const pageSizeOptions = [{
  value: '10',
  label: '10',
},
{
  value: '15',
  label: '15',
},
{
  value: '20',
  label: '20',
},]

export const columns = [
  {
    title: 'Tiêu đề',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Nội dung',
    dataIndex: 'content',
    key: 'content',
    render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />,
  },
  {
    title: 'Link video',
    dataIndex: 'linkVideo',
    key: 'linkVideo',
    render: (text) => <a href={encodeURI(text)}>{text}</a>
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: (text, record) => (
      <div className='actionButtons'>
        <UpdateButton record={record} />
        <DeleteButton record={record} />
      </div>
    ),
  },
]

