import { Avatar, Button, Flex, Layout, Typography, Popover } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLogginedUserDetailsReq,
  userLogoutRequest,
} from "../../../redux/utils";
import {
  MenuUnfoldOutlined,
  ProfileOutlined,
  LogoutOutlined,
  BackwardOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
const { Title, Text } = Typography;
const { Header } = Layout;
import "./Profile.css";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const dispatch = useDispatch();
  const { allUserLoading, AllUser, total, user, userLoading } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  function handleLogout() {
    dispatch(userLogoutRequest());
  }
    useEffect(() => {
      dispatch(getLogginedUserDetailsReq());
  }, []);
  useEffect(() => {
    if (user?.data?.username == undefined || user.length == 0) {
      dispatch(getLogginedUserDetailsReq());
    }
  }, [user?.data?.username]);
  console.log(user?.data?.image);
  const content = (
    <div>
      <p
        style={{ margin: "0px", cursor: "pointer" }}
        onClick={() => navigate("/profile")}
      >
        <ProfileOutlined style={{ paddingRight: "5px" }} />
        Profile
      </p>
      <hr></hr>
      <p style={{ margin: "0px", cursor: "pointer" }} onClick={handleLogout}>
        <LogoutOutlined style={{ paddingRight: "5px" }} />
        logout
      </p>
    </div>
  );
  const handleBackToUser = () => {
    navigate(-1);
  };
  const PersonalDetailsToDisplay = [
    "username",
    "age",
    "gender",
    "email",
    "phone",
    "birthDate",
    "bloodGroup",
    "height",
    "weight",
    "eyeColor",
    "university",
  ];
  const ProfessionalDeatailToDisplay1 = ["department", "name", "title"];
  const ProfessionalDeatailToDisplay2 = ["ein", "ssn", "macAddress", "role"];
  const ProfesstionalDetailsData = user?.data?.company || {};

  const personalDetails = user?.data || {};
  return (
    <div className="profile">
      <Header className="header" >
        <p style={{ fontSize: "19px", color: "hsl(0deg 0% 99.22%)" }}>
          Hello! {user?.data?.username}
        </p>
        <Flex align="center" gap={"10px"}>
          <Popover content={content} trigger="hover">
            <Avatar
              style={{ cursor: "pointer" }}
              className="header-avatar"
              size={37}
            >
              {user?.data?.username[0].toUpperCase()}
            </Avatar>
          </Popover>
        </Flex>
      </Header>
      <Flex className="profile-details" gap={40} vertical>
        <p
          style={{ cursor: "pointer", color: "#2d81fd", fontSize: "17px" ,width:"fit-content"}}
          onClick={handleBackToUser}
        >
          <ArrowLeftOutlined
            style={{ paddingRight: "5px", fontSize: "14px", }}
          />
          Back to users
        </p>
        <Flex className="profile-details-header" gap={15}>
          <Avatar
            src={user?.data?.image}
            size={150}
            className="profile-header-header-avatar"
            shape="circle"
          ></Avatar>
          <Flex vertical>
            <Title level={2}>
              {user?.data?.firstName} {user?.data?.lastName}
            </Title>
            <Text style={{ margin: "0", color: "#4a5568" }}>
              Company: {user?.data?.company?.name} | Department:{" "}
              {user?.data?.company?.department}
            </Text>
          </Flex>
        </Flex>
        <Flex className="profile-detail-for-moblie" gap={35} style={{ width: "98.5%" }}>
          <Flex className="personal-information" vertical>
            <Title level={3}>Personal Information</Title>
            <hr style={{ width: "100%" }}></hr>
            {PersonalDetailsToDisplay.map((key) => (
              <div className="details-info">
                <p>{key}:</p>
                <p>{personalDetails[key]}</p>
              </div>
            ))}
          </Flex>
          <Flex vertical style={{ width: "98.5%" }} gap={40}>
            <Flex className="Professional-Info" vertical>
              <Title level={3}>Address & Professional-Info</Title>
              <hr style={{ width: "100%" }}></hr>
              <Flex gap={30}>
                <Flex vertical gap={40} className="flex-professtional-detail1">
                  {ProfessionalDeatailToDisplay1?.map((key) => (
                    <Flex className="professtional-details-info">
                      <p>{key}:</p>
                      <p>{ProfesstionalDetailsData[key]}</p>
                    </Flex>
                  ))}
                  <Flex className="professtional-details-info">
                    <p>Company Address:</p>
                    <p>
                      {user?.data?.company?.address?.address},
                      {user?.data?.company?.address?.city},
                      {user?.data?.company?.address?.state},
                      {user?.data?.company?.address?.postalCode}
                    </p>
                  </Flex>
                </Flex>
                <Flex vertical gap={40}>
                  {ProfessionalDeatailToDisplay2?.map((key) => (
                    <Flex className="professtional-details-info">
                      <p>{key}:</p>
                      <p>{personalDetails[key]}</p>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </Flex>
            <Flex className="Professional-Info" vertical>
              <Title level={3}>Address & Professional-Info</Title>
              <hr style={{ width: "100%" }}></hr>
              <Flex gap={30}>
                <Flex vertical gap={40} className="flex-professtional-detail1">
                  {ProfessionalDeatailToDisplay1?.map((key) => (
                    <Flex className="professtional-details-info">
                      <p>{key}:</p>
                      <p>{ProfesstionalDetailsData[key]}</p>
                    </Flex>
                  ))}
                  <Flex className="professtional-details-info">
                    <p>Company Address:</p>
                    <p>
                      {user?.data?.company?.address?.address},
                      {user?.data?.company?.address?.city},
                      {user?.data?.company?.address?.state},
                      {user?.data?.company?.address?.postalCode}
                    </p>
                  </Flex>
                </Flex>
                <Flex vertical gap={40}>
                  {ProfessionalDeatailToDisplay2?.map((key) => (
                    <Flex className="professtional-details-info">
                      <p>{key}:</p>
                      <p>{personalDetails[key]}</p>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          
        </Flex>
      </Flex>
    </div>
  );
};

export default Profile;
