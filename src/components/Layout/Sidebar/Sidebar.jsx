import { Layout, Menu, Image } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation, matchRoutes } from 'react-router-dom';
import data from './data';
import logo from '../../../assets/logo.svg';

const { Sider } = Layout;

const Sidebar = ({ ...rest }) => {
  const authState = useSelector(state => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sider
      width={240}
      style={{
        height: '100vh',
        position: 'fixed',
        top: 0,
        bottom: 0,
        overflowY: 'auto',
        backgroundColor: '#FFFFFF',
      }}
      {...rest}
    >
      <Image src={logo} alt='logo' width={100} preview={false} />
      <Menu theme='white' mode='inline'>
        {data.map(link => {
          if (link.forAdmin && authState?.userData?.role !== 'Admin') {
            return null;
          }

          return (
            <Menu.Item
              key={link.name}
              icon={<link.icon />}
              style={{
                backgroundColor: matchRoutes([{ path: link.path }], location)
                  ? '#2FB95D'
                  : 'inherit',
              }}
              onClick={() => navigate(link.path)}
            >
              {link.name}
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
