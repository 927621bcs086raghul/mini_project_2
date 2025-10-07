import { Layout, Table, Avatar, Popover, Flex,Tabs,Input } from "antd";
import React, { useEffect, useState } from "react";
import { getAllUserRequest, userLogoutRequest,userSearchRequest } from "../redux/utils";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { SearchOutlined} from "@ant-design/icons";
const { Header, Footer, Sider, Content } = Layout;
import { data, useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { calc } from "antd/es/theme/internal";
import DashboardTable from "./dashboard/DashboardTable";
import DashboardCard from "./dashboard/DashboardCard";
import '../Auth/Dashboard.css';
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}
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
  const items = [
    {
      key: "Table",
      label: "Table",
      children: <DashboardTable />,
    },
    {
      key: "card",
      label: "card",
      children: <DashboardCard/>,
    },
  ];
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allUserLoading, AllUser, total } = useSelector((state) => state.auth);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
  useEffect(()=>{
if(!localStorage.getItem("token")){
  navigate("/login")
}
  },[localStorage.getItem("token")])
const token =localStorage.getItem("token");
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (isTokenExpired(token)) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }, []);
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    return true;
  }
};
useEffect(()=>{
  console.log(search)
  dispatch(userSearchRequest({search:search,users:AllUser}))
console.log(AllUser)
},[debouncedSearch])
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

      <div className="dashboard">
              <Flex className="table-heading" justify="space-between">
        <h2>USER</h2>
         <Input
                    placeholder="Search "
                    value={search}
                    className="input-search-user-dashboard"
                    onChange={(e) => {
                      setSearch(e.target.value);
                      console.log(search);
                    }}
                    prefix={<SearchOutlined className="search-icon" />}
                  />
      </Flex>
              <Tabs className="card-table-user-view" items={items}></Tabs>

      </div>
    </div>
  );
};

export default Dashboard;
