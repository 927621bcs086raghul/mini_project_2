import {
  Avatar,
  Card,
  Flex,
  Pagination,
  Button,
  Popconfirm,
  Typography,
  Space,
  Tag,
} from "antd";
const { Meta } = Card;
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserdataReq,
  modalOperatorOpen,
  deleteUserRequest,
  drawerOperatorViewClose,
  drawerOperatorViewOpen,
  getSinglePostReq,
} from "../../../redux/utils";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../DashboardUserCard.css";
import "./DashboardPostCard.css";
import Paragraph from "antd/es/typography/Paragraph";
import { useMemo } from "react";
import ViewPost from "./ViewPost";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

const imageSources = [
  "https://cdn.pixabay.com/photo/2018/08/04/11/30/draw-3583548_1280.png",
  "https://images.unsplash.com/photo-1593696954577-ab3d39317b97?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000",
  "https://images.unsplash.com/photo-1526779259212-939e64788e3c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1174",
  "https://tinypng.com/images/social/website.jpg",
  "https://tinypng.com/images/social/developer-api.jpg",
];
const colors = ["#874242ff", "#558155ff", "#7777c2ff"];
const DashboardPostCard = () => {
  const { allUserLoading, AllPostData, total, loading, loadingId, AllUser } =
    useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [imageMap, setImageMap] = useState({});
  const [tagColorMap, setTagColorMap] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [tagsColor, setTagsColor] = useState({});
  useEffect(() => {
    const color = {};
    AllPostData?.map((post) => {
      const tags = post?.tags;
      tags.map((tag) => {
        if (color[`${tag}`] == undefined) {
          color[`${tag}`] = getRandomRGBA();
        }
      });
    });
    setTagsColor(color);
    function getRandomRGBA() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      const a = 0.8;
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
  }, []);
  const currentUsers = useMemo(() => {
    return AllPostData.slice(startIndex, endIndex);
  }, [AllPostData, startIndex, endIndex]);

  const handleView = (item) => {
    navigate(`/dashboard/post/${item?.id}`);
  };

  useEffect(() => {
    if (!AllPostData || !AllPostData.length) return;
    const newImageMap = {};
    AllPostData.forEach((item, idx) => {
      const key = item.id ?? idx;
      const imageIndex = key % imageSources.length;
      newImageMap[key] = imageSources[imageIndex];
    });
    setImageMap((prev) => ({ ...newImageMap, ...prev }));
  }, []);

  return (
    <div>
      <div className="dashboard-card">
        {currentUsers.map((item) => (
          <div key={item.id}>
            {" "}
            <Card
              hoverable
              onClick={() => handleView(item)}
              style={{ width: "250px" }}
              cover={
                <Avatar
                  className="post-avatar-card"
                  src={imageMap[item.id]}
                  size={"large"}
                ></Avatar>
              }
              className="card-with-hover"
            >
              <Meta
                title={
                  <div>
                    <Flex gap={5}>
                      {item?.tags?.map((tag) => {
                        return <Tag color={tagsColor[tag]}>{tag}</Tag>;
                      })}
                    </Flex>
                    <Flex vertical>
                      {item?.AllPostData?.tags}
                      <Title
                        ellipsis
                        style={{ maxWidth: "200px", marginTop: "5px" }}
                        level={4}
                      >
                        {item.title}
                      </Title>
                    </Flex>
                  </div>
                }
                style={{ textAlign: "center" }}
                description={
                  <Flex vertical>
                    <Paragraph
                      style={{ textAlign: "start" }}
                      ellipsis={{ rows: 2 }}
                    >
                      {item.body}
                    </Paragraph>
                    <Flex gap={10}>
                      <Avatar
                        src={AllUser?.find((u) => u.id === item.userId)?.image}
                        size={40}
                        style={{ fontSize: "20px", background: "#e3d5d5" }}
                      ></Avatar>
                      <h3
                        className="card-owner"
                        style={{
                          display: "flex",
                          margin: "0",
                          alignItems: "center",
                        }}
                      >
                        {AllUser?.find((u) => u.id === item.userId)?.username}
                      </h3>
                    </Flex>
                  </Flex>
                }
              />
            </Card>
          </div>
        ))}
      </div>

      <Pagination
        current={currentPage}
        total={AllPostData.length}
        pageSize={itemsPerPage}
        showSizeChanger={false}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default DashboardPostCard;
