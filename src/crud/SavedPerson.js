import {useState, useEffect} from "react"

import { Table, Modal, Input} from 'antd';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'

function SavedPerson() {
    const [data, setData] = useState([])
    const [editingPerson, setEditingPerson] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
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
        setModalVisible(true)
        setEditingPerson({...person})
      }

      function onDelete(person) {
        console.log(person)
        Modal.confirm({
            title: 'Estas seguro de querer eliminar esta persona?',
            okText: "si, estoy seguro",
            okType: "danger",
            onOk: () => {  
                setData((data) =>{
                    return data.filter((savedPerson) => savedPerson.id !== person.id)
                })
                localStorage.setItem('savedPerson', JSON.stringify(data.filter((savedPerson) => savedPerson.id !== person.id)))
              }
        })
       
      }

      function resetEditing() {
        setModalVisible(false)
        setEditingPerson(null)
      }
    return(
        <>
            <Table columns={columns} dataSource={data} size="big" pagination={false} />
            <Modal 
                title="edit person" 
                visible={modalVisible} 
                okText="Guardar"
                onCancel={() => {
                    resetEditing()
                }}
                onOk={() => {
                    setData((data) => {
                        return data.map((person) => {
                            if(person.id === editingPerson.id) {
                                return editingPerson
                            } else {
                                return person
                            }
                        })
                    })
                    localStorage.setItem('savedPerson', JSON.stringify(data.map((person) => {
                        if(person.id === editingPerson.id) {
                            return editingPerson
                        } else {
                            return person
                        }
                    })))
                    resetEditing()
                }}
                >
                <Input value={editingPerson?.name} onChange={(e) => {
                    setEditingPerson((data) => {
                        return {...data, name:e.target.value}
                    })
                }}/>
            </Modal>
        </>

    )
}

export default SavedPerson