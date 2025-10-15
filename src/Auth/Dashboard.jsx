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
  Menu,
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
import { data, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import DashboardUserCard from "./dashboard/DashboardUserCard";
import DashboardUserTable from "./dashboard/DashboardUserTable";
import "./dashboard.css";
import EditUser from "./User_CRUD_Operation/EditUser";
import NewUser from "./User_CRUD_Operation/NewUser";
import HeaderCompo from "./header/HeaderCompo";
import SideBar from "./header/SideBar";
import ViewDetails from "./User_CRUD_Operation/ViewDEtails";
import DashboardPostCard from "./dashboard/Posts/DashboardPostCard";
import DashboardPostTable from "./dashboard/Posts/DashboardPostTable";
import ViewPost from "./dashboard/Posts/ViewPost";
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

const itemsuser = [
  {
    key: "Table",
    label: "Table",
    children: <DashboardUserTable />,
    icon: <TableOutlined />,
  },
  {
    key: "card",
    label: "card",
    children: <DashboardUserCard />,
    icon: <UnorderedListOutlined />,
  },
];
const itemspost = [
  {
    key: "Table",
    label: "Table",
    children: <DashboardPostTable />,
    icon: <TableOutlined />,
  },
  {
    key: "card",
    label: "card",
    children: <DashboardPostCard />,
    icon: <UnorderedListOutlined />,
  },
];

const menuItems = [
  {
    key: "Users",
    icon: <UserOutlined />,
    label: "User",
  },
  {
    key: "Posts",
    icon: <DesktopOutlined />,
    label: "Post",
  },
];
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allUserLoading, AllUser, AllPostData, total, user, userLoading } =
    useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const token = localStorage.getItem("token");
  const [selectedKey, setSelectedKey] = useState("Users");
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

  useEffect(() => {
    if (selectedKey == "Users") {
      dispatch(userSearchRequest({ search: search }));
    } else {
      dispatch(setSeacrhPOst({ search: search }));
    }
  }, [debouncedSearch]);
  useEffect(() => {
    console.log(AllPostData?.length);
    console.log(AllUser);
    console.log(AllUser?.length);
    if ((selectedKey == "Users") & (AllUser?.length <= 0)) {
      dispatch(getAllUserRequest());
    } else if (AllPostData.length <= 0) {
      dispatch(getAllPostRequest());
    }
  }, [selectedKey]);

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
    const selectedItem = menuItems.find((item) => item.key === key);
    if (selectedItem) {
      setHeadingText(selectedItem.label);
    }
  };
  const handlePostViewBack =()=>{
    setSelectedKey("posts");
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
          <Flex className="table-heading" justify="space-between">
            <h2>{selectedKey}</h2>
            <Flex gap={15}>
              <Input
                placeholder="Input search text "
                value={search}
                className="input-search-user-dashboard"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                suffix={<SearchOutlined className="search-icon" />}
              />
              {selectedKey === "Users" && (
                <Button
                  type="primary"
                  className="create-user-edit-delete-table-button"
                  style={{ marginTop: "19px", borderRadius: "0" }}
                  onClick={() => {
                    dispatch(drawerOperatorOpen());
                  }}
                >
                  Create user
                </Button>
              )}
            </Flex>
          </Flex>
          <Tabs
            className="card-table-user-view"
            items={selectedKey == "Users" ? itemsuser : itemspost}
          ></Tabs>
        </div>
        <EditUser handleClose={handleClose}></EditUser>
        <NewUser handleClose={handleDrawerClose}></NewUser>
        <ViewDetails handleClose={handleViewUSer}></ViewDetails>
      </div>
    </div>
  );
};

export default Dashboard;
