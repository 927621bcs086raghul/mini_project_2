import {
  Layout,
  Table,
  Avatar,
  Popover,
  Flex,
  Tabs,
  Input,
  Button,
  Modal,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  getAllUserRequest,
  userLogoutRequest,
  userSearchRequest,
  getLogginedUserDetailsReq,
  modalOperatorClose,
  modalOperatorOpen,
} from "../redux/utils";
import { useDispatch, useSelector } from "react-redux";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import {
  SearchOutlined,
  TableOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
const { Header, Footer, Sider, Content } = Layout;
import { data, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { calc } from "antd/es/theme/internal";
import DashboardTable from "./dashboard/DashboardTable";
import DashboardCard from "./dashboard/DashboardCard";
import "../Auth/Dashboard.css";
import { icons } from "antd/es/image/PreviewGroup";
import NewUser from "./User_CRUD_Operation/NewUser";
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
];
const items = [
  {
    key: "Table",
    label: "Table",
    children: <DashboardTable />,
    icon: <TableOutlined />,
  },
  {
    key: "card",
    label: "card",
    children: <DashboardCard />,
    icon: <UnorderedListOutlined />,
  },
];
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allUserLoading, AllUser, total, user,userLoading } = useSelector(
    (state) => state.auth
  );
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [localStorage.getItem("token")]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isTokenExpired(token)) {
      localStorage.removeItem("token");
      window.location.href = "/login";
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
  if (user?.data?.username == undefined) {
    dispatch(getLogginedUserDetailsReq());
  }
  useEffect(() => {
    console.log(search);
    dispatch(userSearchRequest({ search: search, users: AllUser }));
    console.log(AllUser);
  }, [debouncedSearch]);
  useEffect(() => {
    dispatch(getAllUserRequest());
  }, []);
  function handleLogout() {
    dispatch(userLogoutRequest());
  }
  const content = (
    <div>
      <p style={{ margin: "0px", cursor: "pointer" }} onClick={handleLogout}>
        logout
      </p>
    </div>
  );
  const dataSource = AllUser?.map((user) => ({
    key: user.id,
    username: user.username,
    age: user.age,
    email: user.email,
    phone: user.phone,
  }));
  const handleClose=()=>{
    dispatch(modalOperatorClose())
  }
  return (
    <div>
      <Header className="header">
        <MenuUnfoldOutlined />
        <Flex align="center" gap={"10px"}>
          <p style={{ fontSize: "19px", color: "hsl(0deg 0% 99.22%)" }}>
            {user?.data?.username}
          </p>
          <Popover content={content} trigger="hover">
            <Avatar
              style={{ cursor: "pointer" }}
              className="header-avatar"
              size={32}
              icon={<LogoutOutlined />}
            />
          </Popover>
        </Flex>
      </Header>

      <div className="dashboard">
        <div className="dashboard-body">
          <Flex className="table-heading" justify="space-between">
            <h2>Users</h2>
            <Flex gap={15}>
              <Input
                placeholder="Input search text "
                value={search}
                className="input-search-user-dashboard"
                onChange={(e) => {
                  setSearch(e.target.value);
                  console.log(search);
                }}
                suffix={<SearchOutlined className="search-icon" />}
              />
              <Button
                type="primary"
                className="create-user-edit-delete-table-button"
                style={{ marginTop: "19px", borderRadius: "0" }}
                onClick={()=>{dispatch(modalOperatorOpen())}}
              >
                Create User
              </Button>
            </Flex>
          </Flex>
          <Tabs className="card-table-user-view" items={items}></Tabs>
        </div>
        <NewUser  handleClose={handleClose}></NewUser>
      </div>
    </div>
  );
};

export default Dashboard;
