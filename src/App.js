import './App.css';
import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';
import {useState, useEffect} from "react"

import SavedPerson from "./crud/SavedPerson"
import { Table, Layout, Menu} from 'antd';
import 'antd/dist/antd.css';
import FetchList from './crud/FetchList';


const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;


function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [data, setData] = useState([])
  const [savedList, setSavedList] = useState([])
  const [content, setContent] = useState('fetchList')

  const url = 'https://gorest.co.in/public/v2/users'
  useEffect(() => {
    axios.get(url).then(response => setData(response.data))
    const savedLocal = JSON.parse(localStorage.getItem("savedPerson"))
    if(savedLocal !== null) {
      setSavedList(savedLocal)
    }
  }, [])

  return (
    <Router>
      <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          
        >
          <Menu.Item key="1">
              <span>Nueva Lista</span>
              <Link to="/" />
          </Menu.Item>
          <Menu.Item key="2">
              <span>Almacenados</span>
              <Link to="/saved-list" />
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Routes>
            <Route exact path="/" element={<FetchList data={data}/>}/>
            <Route exact path="/saved-list" element={<SavedPerson />}/>
          </Routes>
        </Content>
      </Layout>
    </Layout>
    </Router>
  );
}

export default App;
