
import { Tabs,Table,Flex, Avatar, Button } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
import './DashboardTable.css'
const columns = [
  {
    title: "",
    dataIndex: "image",
    render:(image)=>{
      return (
        <>
        <Avatar src={image} ></Avatar>
        </>
      )
    }    
  },
  {
    title: "email",
    dataIndex: "email",
    sorter: (a, b) => a.email.localeCompare(b.email),
  },
{
    title: "First name",
    dataIndex: "firstname",
    sorter: (a, b) => a.firstname.localeCompare(b.firstname),
  },

  {
    title: "Last name",
    dataIndex: "lastname",
    sorter: (a, b) => a.lastname.localeCompare(b.lastname),
  },
  {
    title:"Action",
    render:()=>{
        return(
          <Flex gap={15}>
          <Button type='primary'className="create-user-edit-delete-table-button">
            Edit
          </Button>
          <Button type='primary' className="create-user-edit-delete-table-button" danger>
            Delete
          </Button>
          </Flex>
        )
    }
  }
];
const DashboardTable = () => {
  console.log("2.hi")
  const { allUserLoading, AllUser, total } = useSelector((state) => state.auth);
  const dataSource = AllUser.map((user) => ({
    key: user.id,
  image:user.image,
    age: user.age,
    email: user.email,
    firstname:user.firstName,
    lastname:user.lastName,
  }));
  return (
        <Table
          columns={columns}
          className="user-table"
          dataSource={dataSource}
          loading={allUserLoading}
          scroll={{y:390, x:"max-content"}}
          pagination={{
            showSizeChanger: false,
          }
          }
        ></Table>
  )
}

export default DashboardTable
