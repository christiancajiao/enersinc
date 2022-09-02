import './App.css';
import {useState, useEffect} from "react"
import { Table } from 'antd';
import 'antd/dist/antd.css';

function App() {
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
      <Table columns={columns} dataSource={data} size="big" pagination={false} />
    </div>
  );
}

export default App;
