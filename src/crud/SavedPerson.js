import {useState, useEffect} from "react"

import { Table} from 'antd';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'

function SavedPerson() {
    const [data, setData] = useState([])
    useEffect(() => {
    const savedLocal = JSON.parse(localStorage.getItem("savedPerson"))
    if(savedLocal !== null) {
        setData(savedLocal)
    }
    }, [data])
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
            <EditOutlined onClick={()=> {
                onEdit(person)
            }}/>
            <DeleteOutlined onClick={()=> {
                onDelete(person)
            }}  style={{color: 'red', marginLeft: 12}}/>
            </div>
            
           ),
        }
      ];

      function onEdit(person) {
        console.log(person)
      }
      function onDelete(person) {
        console.log(person)
        setData((data) =>{
            return data.filter((savedPerson) => savedPerson.id !== person.id)
        })
        localStorage.setItem('savedPerson', JSON.stringify(data.filter((savedPerson) => savedPerson.id !== person.id)))
      }
    return(
        <Table columns={columns} dataSource={data} size="big" pagination={false} />
    )
}

export default SavedPerson