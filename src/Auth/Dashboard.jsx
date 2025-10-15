import { Layout, Menu } from "antd";
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
  drawerOperatorViewClose,
  drawerOperatorViewOpen,
  getAllPostRequest,
  setSeacrhPOst,
} from "../redux/utils";
import { useDispatch, useSelector } from "react-redux";
import { MenuUnfoldOutlined, ProfileOutlined } from "@ant-design/icons";
import {
  SearchOutlined,
  TableOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  DesktopOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Header, Footer, Sider, Content } = Layout;
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import "./dashboard.css";
import EditUser from "./User_CRUD_Operation/EditUser";
import NewUser from "./User_CRUD_Operation/NewUser";
import HeaderCompo from "./header/HeaderCompo";
import SideBar from "./header/SideBar";
import ViewDetails from "./User_CRUD_Operation/ViewDEtails";
import ViewPost from "./dashboard/Posts/ViewPost";
const menuItems = [
  {
    key: "users",
    icon: <UserOutlined />,
    label: "Users",
  },
  {
    key: "posts",
    icon: <DesktopOutlined />,
    label: "Posts",
  },
];
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allUserLoading, AllUser, AllPostData, total, user, userLoading } =
    useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  const [selectedKey, setSelectedKey] = useState("users");
  const [headingText, setHeadingText] = useState("Users");
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
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

  // keep Dashboard as a layout; the detailed Users/Posts hooks/UI live in
  // the nested components (UsersView / PostsView). Update selectedKey
  // based on current location so the sidebar highlights correctly.
  const location = useLocation();
  useEffect(() => {
    const parts = location.pathname.split("/").filter(Boolean);
    const last = parts[parts.length - 1] || "users";
    // normalize to our keys
    const key = last === "dashboard" ? "users" : last;
    setSelectedKey(key);
    const selectedItem = menuItems.find((item) => item.key === key);
    if (selectedItem) setHeadingText(selectedItem.label);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleClose = () => {
    dispatch(modalOperatorClose());
  };
  const handleDrawerClose = () => {
    dispatch(drawerOperatorClose());
  };
  const handleViewUSer = () => {
    dispatch(drawerOperatorViewClose());
  };
  const handleMenuSelect = ({ key }) => {
    console.log(key);
    setSelectedKey(key);
    navigate(`/dashboard/${key}`);
  };
  const handlePostViewBack =()=>{
    setSelectedKey("posts");
    navigate(`/dashboard/posts`);
  }
  return (
    <div>
      <HeaderCompo />

      <div className="dashboard">
        <SideBar
          selectedKey={selectedKey}
          onSelect={handleMenuSelect}
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          menuItems={menuItems}
        />
        <div className="dashboard-body">
          {/* Nested routes will render here */}
          <Outlet />
        </div>
        <EditUser handleClose={handleClose}></EditUser>
        <NewUser handleClose={handleDrawerClose}></NewUser>
        <ViewDetails handleClose={handleViewUSer}></ViewDetails>
      </div>
    </div>
  );
};

export default Dashboard;
