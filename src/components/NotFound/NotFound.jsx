import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <Result
      status='404'
      title='404'
      subTitle='Xin lỗi, trang bạn đang tìm kiếm không tồn tại.'
      extra={
        <Button type='primary' onClick={goHome}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotFound;
