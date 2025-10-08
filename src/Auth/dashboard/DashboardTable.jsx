
import { Tabs,Table,Flex, Avatar } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
import './DashboardTable.css'
const columns = [
  {
    title: "",
    dataIndex: "image",
    width: 150,
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
];
const DashboardTable = () => {
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
<Flex justify="center">
        <Table
          columns={columns}
          className="user-table"
          dataSource={dataSource}
          pagination={{ pageSize: 50 }}
          loading={allUserLoading}
          scroll={{ y: 30 * 13 }}
        ></Table>
        </Flex>
  )
}

export default DashboardTable
