import './App.css';
import React from "react"
import {useState, useEffect} from "react"
import { Table, Layout, Menu } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';


const { Header, Sider, Content } = Layout;


function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [data, setData] = useState([])

  const url = 'https://gorest.co.in/public/v2/users'
  useEffect(() => {
    console.log(data)
    fetch(url).then(response => response.json()).then(data => setData(data))
  }, [])


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'status',
      dataIndex: 'status',
    },
    {
      title: 'Add',
      render: (text, record) => (
        <button onClick={()=> console.log(record)}>
          {"Add"}
        </button>
       ),
    }
  ];


  return (
    <div className="App">
      <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'lista',
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: 'Almacenados',
            }
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
            <Table columns={columns} dataSource={data} size="big" pagination={false} />
        </Content>
      </Layout>
    </Layout>
    </div>
  );
}

export default App;
