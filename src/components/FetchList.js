
import { Table} from 'antd';
import 'antd/dist/antd.css';
import {useState, useEffect} from "react"



function FetchList(props) {

    useEffect(() => {
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
          render: (person) => (
            <button onClick={()=> {
              const savedLocal = JSON.parse(localStorage.getItem("savedPerson"))
              if(savedLocal === null){
                localStorage.setItem('savedPerson', JSON.stringify([person]))
              } else {
                //check if the user already exist in localstorage
                let repeted = savedLocal.find((e) => e.name === person.name)
                if(repeted === undefined) {
                  localStorage.setItem('savedPerson', JSON.stringify([...savedLocal, person]))
                } else {
                  return
                }
    
              }
            }}>
              {"Add"}
            </button>
           ),
        }
      ];
    return(
        <Table columns={columns} dataSource={props.data} size="big" pagination={false} />
    )
}

export default FetchList