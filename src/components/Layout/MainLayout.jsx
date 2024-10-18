import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar/Navbar';
import { useState } from 'react';

const { Content } = Layout;

const MainLayout = () => {
  const [farmSelectedId, setFarmSelectedId] = useState(null);

  return (
    <Layout
      style={{
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <Sidebar />
      <Layout style={{ paddingLeft: '240px' }}>
        <Navbar onFarmChange={setFarmSelectedId}/>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div
            style={{
              padding: 24,
              background: '#F5FFF5',
              minHeight: 'calc(100vh - 112px)',
            }}
          >
            <Outlet context={{ farmSelectedId }}/>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
