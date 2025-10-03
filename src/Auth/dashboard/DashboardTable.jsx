
import { Tabs,Table,Flex } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
const columns = [
  {
    title: "username",
    dataIndex: "username",
    width: 150,
    sorter: (a, b) => a.username.localeCompare(b.username), 
  },
  {
    title: "Age",
    dataIndex: "age",
    width: 150,
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "email",
    dataIndex: "email",
    sorter: (a, b) => a.email.localeCompare(b.email),
  },
  {
    title: "phone",
    dataIndex: "phone",
    sorter: (a, b) => a.phone.localeCompare(b.phone),
  },
];
const DashboardTable = () => {
  const { allUserLoading, AllUser, total } = useSelector((state) => state.auth);
  const dataSource = AllUser.map((user) => ({
    key: user.id,
    username: user.username,
    age: user.age,
    email: user.email,
    phone: user.phone,
  }));
  return (
<Flex justify="center">
        <Table
          columns={columns}
          className="user-table"
          dataSource={dataSource}
          pagination={{ pageSize: 50 }}
          loading={allUserLoading}
          scroll={{ y: 38 * 13 }}
        ></Table>
        </Flex>
  )
}

export default DashboardTable
