// import { Layout, Avatar, Typography, Space, Select } from 'antd';
// import { LogoutOutlined } from '@ant-design/icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { logout } from '../../../features/auth/authSlice';
// import { useGetFarmListQuery } from '../../../features/farms/farmApi';
// import { useState } from 'react';

// const { Header } = Layout;
// const { Text } = Typography;

// const Navbar = ({ onFarmChange  }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const authState = useSelector(state => state.authSlice);
//   const { data: farmData, isLoading } = useGetFarmListQuery();

//   const [farmSelectedId, setFarmSelectedId] = useState(
//     Cookies.get('farmSelectedId') !== undefined &&
//       Cookies.get('farmSelectedId') !== 'null'
//       ? Cookies.get('farmSelectedId')
//       : null
//   );
//   const [farmSelectedName, setFarmSelectedName] = useState(
//     Cookies.get('farmSelectedName') || null
//   );
//   const [farmSelectedCode, setFarmSelectedCode] = useState(
//     Cookies.get('farmSelectedCode') || null
//   );

//   const handleFarmChange = farmId => {
//     const selectedFarm = farmData?.data?.find(farm => farm.farmID === farmId);

//     if (!farmId || !selectedFarm) {
//       setFarmSelectedId(null);
//       setFarmSelectedName(null);
//       setFarmSelectedCode(null);
//       Cookies.set('farmSelectedId', 'null', { expires: 7 });
//       Cookies.set('farmSelectedName', 'null', { expires: 7 });
//       Cookies.set('farmSelectedCode', 'null', { expires: 7 });
//     } else {
//       setFarmSelectedId(farmId);
//       setFarmSelectedName(selectedFarm.farmName);
//       setFarmSelectedCode(selectedFarm.farmCode);
//       Cookies.set('farmSelectedId', farmId, { expires: 7 });
//       Cookies.set('farmSelectedName', selectedFarm.farmName, { expires: 7 });
//       Cookies.set('farmSelectedCode', selectedFarm.farmCode, { expires: 7 });
//     }

//     onFarmChange(farmId);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     Cookies.remove('farmSelectedId');
//     Cookies.remove('farmSelectedName');
//     Cookies.remove('farmSelectedCode');
//     navigate('/login');
//   };

//   return (
//     console.log('Farm Selected ID:' + farmSelectedId),
//     console.log('Farm Selected Name:' + farmSelectedName),
//     console.log('Farm Selected Code:' + farmSelectedCode),
//     (
//       <Header
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           padding: '0 16px',
//           alignItems: 'center',
//           background: '#fff',
//         }}
//        >
//         <Select
//           placeholder='Select a farm'
//           value={farmSelectedId}
//           style={{ width: 200 }}
//           onChange={handleFarmChange}
//           loading={isLoading}
//         >
//           <Select.Option key='null' value={null}>
//             All Farms
//           </Select.Option>
//           {farmData?.data?.map(farm => (
//             <Select.Option key={farm.farmID} value={farm.farmID}>
//               {farm.farmName}
//             </Select.Option>
//           ))}
//         </Select>

//         <Space align='center'>
//           <Avatar
//             style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }}
//             size='large'
//           >
//             {authState?.userData?.lastName?.charAt(0)}
//           </Avatar>
//           <div
//             style={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'flex-start',
//             }}
//           >
//             <Text strong>
//               {authState?.userData?.name}
//             </Text>
//             <Text type='secondary'>{authState?.userData?.role}</Text>
//           </div>
//           <LogoutOutlined
//             style={{ fontSize: '1.2rem', color: 'red', cursor: 'pointer' }}
//             onClick={handleLogout}
//           />
//         </Space>
//       </Header>
//     )
//   );
// };

// export default Navbar;


import { Layout, Avatar, Typography, Space, Select, Badge, Dropdown, Menu } from 'antd';
import { LogoutOutlined, BellOutlined, DownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { logout } from '../../../features/auth/authSlice';
import { useGetFarmListQuery } from '../../../features/farms/farmApi';
import { useState } from 'react';

const { Header } = Layout;
const { Text } = Typography;

const Navbar = ({ onFarmChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector(state => state.authSlice);
  const { data: farmData, isLoading } = useGetFarmListQuery();

  const [farmSelectedId, setFarmSelectedId] = useState(
    Cookies.get('farmSelectedId') !== undefined &&
    Cookies.get('farmSelectedId') !== 'null'
      ? Cookies.get('farmSelectedId')
      : null
  );
  const [farmSelectedName, setFarmSelectedName] = useState(
    Cookies.get('farmSelectedName') || null
  );
  const [farmSelectedCode, setFarmSelectedCode] = useState(
    Cookies.get('farmSelectedCode') || null
  );

  const handleFarmChange = farmId => {
    const selectedFarm = farmData?.data?.find(farm => farm.farmID === farmId);

    if (!farmId || !selectedFarm) {
      setFarmSelectedId(null);
      setFarmSelectedName(null);
      setFarmSelectedCode(null);
      Cookies.set('farmSelectedId', 'null', { expires: 7 });
      Cookies.set('farmSelectedName', 'null', { expires: 7 });
      Cookies.set('farmSelectedCode', 'null', { expires: 7 });
    } else {
      setFarmSelectedId(farmId);
      setFarmSelectedName(selectedFarm.farmName);
      setFarmSelectedCode(selectedFarm.farmCode);
      Cookies.set('farmSelectedId', farmId, { expires: 7 });
      Cookies.set('farmSelectedName', selectedFarm.farmName, { expires: 7 });
      Cookies.set('farmSelectedCode', selectedFarm.farmCode, { expires: 7 });
    }

    onFarmChange(farmId);
  };

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove('farmSelectedId');
    Cookies.remove('farmSelectedName');
    Cookies.remove('farmSelectedCode');
    navigate('/login');
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleLogout}>
        <Space>
          <LogoutOutlined /> Logout
        </Space>
      </Menu.Item>
    </Menu>
  );
  

  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 16px',
        alignItems: 'center',
        background: '#fff',
      }}
    >
      <Select
        placeholder='Select a farm'
        value={farmSelectedId}
        style={{ width: 200 }}
        onChange={handleFarmChange}
        loading={isLoading}
      >
        <Select.Option key='null' value={null}>
          All Farms
        </Select.Option>
        {farmData?.data?.map(farm => (
          <Select.Option key={farm.farmID} value={farm.farmID}>
            {farm.farmName}
          </Select.Option>
        ))}
      </Select>

      <Space align='center' size={24}> {/* Increased space between items */}
        {/* Notification bell with badge */}
        <Badge dot>
          <BellOutlined style={{ fontSize: '1.5rem', cursor: 'pointer' }} />
        </Badge>

        {/* Avatar with dropdown */}
        <Dropdown overlay={menu} trigger={['click']}>
          <Space>
            <Avatar
              size="large"
              src={authState?.userData?.avatar}
              style={{
                cursor: 'pointer',
                border: '2px solid #1890ff',  // Adding border to avatar
                padding: '2px',               // Optional padding for better visual
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Text strong>{authState?.userData?.name}</Text>
              <Text type='secondary'>{authState?.userData?.role}</Text>
            </div>
            <DownOutlined />
          </Space>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default Navbar;

