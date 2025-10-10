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
  drawerOperatorOpen,
  drawerOperatorClose,
} from "../redux/utils";
import { useDispatch, useSelector } from "react-redux";
import { MenuUnfoldOutlined,ProfileOutlined } from "@ant-design/icons";
import {
  SearchOutlined,
  TableOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
const { Header, Footer, Sider, Content } = Layout;
import { data, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import DashboardTable from "./dashboard/DashboardTable";
import DashboardCard from "./dashboard/DashboardCard";
import "../Auth/Dashboard.css";
import EditUser from "./User_CRUD_Operation/EditUser";
import NewUser from "./User_CRUD_Operation/NewUser";
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

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
  useEffect(()=>{
 if (user?.data?.username == undefined) {
    dispatch(getLogginedUserDetailsReq());
  }
  },[user?.data?.username])
 
  useEffect(() => {
    dispatch(userSearchRequest({ search: search, users: AllUser }));
    
  }, [debouncedSearch]);
  useEffect(() => {
    dispatch(getAllUserRequest());
  }, []);
  function handleLogout() {
    dispatch(userLogoutRequest());
  }
  const content = (
    <div>
      <p style={{ margin: "0px", cursor: "pointer" }}> 
        <ProfileOutlined style={{paddingRight:"5px"}} />Profile
      </p>
      <hr></hr>
      <p style={{ margin: "0px", cursor: "pointer" }} onClick={handleLogout}>
        <LogoutOutlined style={{paddingRight:"5px"}}/>logout
      </p>
    </div>
  );

  const handleClose=()=>{
    dispatch(modalOperatorClose())
  }
    const handleDrawerClose=()=>{
    dispatch(drawerOperatorClose())
  }
  return (
    <div>
      <Header className="header">
          <p style={{ fontSize: "19px", color: "hsl(0deg 0% 99.22%)" }}>
            Hello! {user?.data?.username}
          </p>
        <Flex align="center" gap={"10px"}>
        
          <Popover content={content} trigger="hover">
            <Avatar
              style={{ cursor: "pointer" }}
              className="header-avatar"
              size={37}
            >{user?.data?.username[0].toUpperCase()}</Avatar>
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
                onClick={()=>{dispatch(drawerOperatorOpen())}}
              >
                Create User
              </Button>
            </Flex>
          </Flex>
          <Tabs className="card-table-user-view" items={items}></Tabs>
        </div>
        <EditUser  handleClose={handleClose}></EditUser>
        <NewUser handleClose={handleDrawerClose}></NewUser>
      </div>
    </div>
  );
};

export default Dashboard;
