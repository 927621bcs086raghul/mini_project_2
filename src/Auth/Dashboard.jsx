import { Layout, Table, Avatar, Popover, Flex } from "antd";
import React, { useEffect } from "react";
import { getAllUserRequest, userLogoutRequest } from "../redux/utils";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
const { Header, Footer, Sider, Content } = Layout;
import { data, useNavigate } from "react-router-dom";
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

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allUserLoading, AllUser } = useSelector((state) => state.auth);
  console.log("ji");
  useEffect(()=>{
if(!localStorage.getItem("token")){
  navigate("/login")
}
  },[localStorage.getItem("token")])

  useEffect(() => {
    dispatch(getAllUserRequest());
  }, []);
  function handleLogout(){
    dispatch(userLogoutRequest());
  }
  const content = (
  <div >
    <p style={{ margin: "0px", cursor: "pointer" }}onClick={handleLogout}>logout</p>
  </div>
);
  const dataSource = AllUser.map((user) => ({
    key: user.id,
    username: user.username,
    age: user.age,
    email: user.email,
    phone: user.phone,
  }));
  return (
    <div>
      <Header className="header">
        <MenuUnfoldOutlined />
        <Popover content={content} trigger="hover">
          <Avatar shape="square" size={32} icon={<UserOutlined />} />
        </Popover>
      </Header>
      <Flex justify="center" style={{background:"blanchedalmond", padding:"10px"}}>
        <Table
          columns={columns}
          className="user-table"
          dataSource={dataSource}
          pagination={{ pageSize: 50 }}
          loading={allUserLoading}
          scroll={{ y: 44 * 13 }}
        ></Table>
      </Flex>
    </div>
  );
};

export default Dashboard;
