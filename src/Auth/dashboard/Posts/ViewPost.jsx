import { Button, Flex, Image, Tag, Typography, Skeleton, Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ViewPost.css";
import { useNavigate, useParams } from "react-router-dom";
import HeaderCompo from "../../header/HeaderCompo";
import SideBar from "../../header/SideBar";
import { LikeOutlined } from "@ant-design/icons";

import { getSinglePostReq, getAllCommentsReq } from "../../../redux/utils";
const { Title, Text } = Typography;
const colors = ["#874242ff", "#558155ff", "#7777c2ff"];
const menuItems = [
  {
    key: "Users",
    icon: null,
    label: "User",
  },
  {
    key: "Posts",
    icon: null,
    label: "Post",
  },
];

const ViewPost = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    allUserLoading,
    AllPostData,
    total,
    modalValue,
    loading,
    loadingId,
    singlePostLoading,
    singlePost,
    comments,
  } = useSelector((state) => state.auth);
  useEffect(() => {
    if (id > 251) {
      navigate(-1);
    }
  }, [id]);
  useEffect(() => {
    dispatch(getSinglePostReq(id));
    dispatch(getAllCommentsReq(id));
  }, []);
  const postById = AllPostData.find((post) => post.id == id);
  const getRandomColr = (colorArray) => {
    const randomIndex = Math.floor(Math.random() * colorArray.length);
    return colorArray[randomIndex];
  };
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <div className="dashboard">
        <div className="body-post">
          <div className="view-post view-post-details">
            {singlePostLoading ? (
              <div style={{ width: "700px" }}>
                <Skeleton active avatar title paragraph={{ rows: 6 }} />
              </div>
            ) : (
              <Flex vertical gap={10}>
                <Button
                  style={{
                    width: "100px",
                    height: "50px",
                    background: "#7588ff",
                    padding: "5px",
                  }}
                  type={"primary"}
                  onClick={handleBack}
                >
                  back
                </Button>
                <Title style={{ margin: 0 }}>{singlePost?.title}</Title>
                <Image
                  src="https://cdn.pixabay.com/photo/2018/08/04/11/30/draw-3583548_1280.png"
                  className="post-image"
                ></Image>
                <Flex gap={5}>
                  {singlePost?.tags?.map((tag) => (
                    <Tag color={getRandomColr(colors)} key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </Flex>
                <Text className="post-body">{singlePost?.body}</Text>
                <Flex vertical gap={5}>
                  {comments.length >0 && 
                  
                  (
                  <><Title level={4}>comments</Title>
                  <Flex vertical gap={10}>
                    {comments?.map((comment) => {
                      return (
                        <>
                          <Flex gap={5} align="center">
                            <Avatar size={40}>
                              {comment?.user?.username[0]?.toUpperCase()}
                            </Avatar>

                            <Flex vertical>
                              <Flex gap={10}>
                                <Title level={5} className="commented-user">
                                  {comment?.user?.username}
                                </Title>
                                <LikeOutlined />
                                <Text>{comment?.likes}</Text>
                              </Flex>
                              <Text className="post-body">{comment?.body}</Text>
                            </Flex>
                          </Flex>
                        </>
                      );
                    })}
                  </Flex></>)}
                </Flex>
              </Flex>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewPost;
