import {useState, useEffect} from "react"

import { Table} from 'antd';

function SavedPerson() {
    const [data, setData] = useState([])
    useEffect(() => {
    const savedLocal = JSON.parse(localStorage.getItem("savedPerson"))
    if(savedLocal !== null) {
        setData(savedLocal)
    }
    })
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
          title: 'actions',
          render: (person) => (
            <div>
                <button onClick={()=> {
              console.log("delete")
            }}>
              Delete
            </button>
            <button onClick={()=> {
              console.log('edit')
            }}>
              Edit
            </button>
            </div>
            
           ),
        }
      ];
    return(
        <Table columns={columns} dataSource={data} size="big" pagination={false} />
    )
}

export default SavedPerson