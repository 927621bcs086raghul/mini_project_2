import { Avatar, Card, Flex, Pagination, Button, Popconfirm, Typography, Space, Tag } from "antd";
const { Meta } = Card;
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserdataReq,
  modalOperatorOpen,
  deleteUserRequest,
  drawerOperatorViewClose,
  drawerOperatorViewOpen,
} from "../../../redux/utils";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../DashboardUserCard.css";
import './DashboardPostCard.css'
import Paragraph from "antd/es/typography/Paragraph";
import { useMemo } from "react";
const { Title } = Typography;

const imageSources = [
  "https://cdn.pixabay.com/photo/2018/08/04/11/30/draw-3583548_1280.png",
  "https://images.unsplash.com/photo-1593696954577-ab3d39317b97?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000",
  "https://images.unsplash.com/photo-1526779259212-939e64788e3c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1174",
  "https://tinypng.com/images/social/website.jpg",
  "https://tinypng.com/images/social/developer-api.jpg",
];
const colors = ['#874242ff', '#558155ff', '#7777c2ff'];
console.log(colors, 'colors')
const DashboardPostCard = () => {
  const { allUserLoading, AllPostData, total, loading, loadingId } = useSelector(
    (state) => state.auth
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [imageMap, setImageMap] = useState({});
  const [tagColorMap, setTagColorMap] = useState({});
  const dispatch = useDispatch();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
    const currentUsers = useMemo(() => {
    console.log("Slicing data...");
    return AllPostData.slice(startIndex, endIndex);
  }, [AllPostData, startIndex, endIndex]); 
  const handleEdit = (id) => {
    dispatch(getUserdataReq(id));
    dispatch(modalOperatorOpen({ option: "edit", id: id }));
  };
  const handleDelete = (id) => {
    dispatch(deleteUserRequest(id));
  };
  const handleView = (item) => {
    // bump visuals for this item when viewing (open drawer)
    bumpVisualsForItem(item.id ?? item.key ?? item);
    dispatch(getUserdataReq(item.id));
    dispatch(drawerOperatorViewOpen(item.id));
  };

  const getRandomImageUrl = useCallback(() => {
    console.log(currentPage)
    console.log(AllPostData.length)
    const randomIndex = Math.floor(Math.random() * imageSources.length);
    return imageSources[randomIndex];
  },[])
    const getRandomColr = (colorArray) => {
  const randomIndex = Math.floor(Math.random() * colorArray.length);
  return colorArray[randomIndex];
};

  // initialize stable images and tag colors per post item
  useEffect(() => {
    if (!AllPostData || !AllPostData.length) return;
    const newImageMap = {};
    const newTagColorMap = {};
    AllPostData.forEach((item, idx) => {
      const key = item.id ?? idx;
      const imageIndex = key % imageSources.length;
      newImageMap[key] = imageSources[imageIndex];

      if (Array.isArray(item.tags)) {
        newTagColorMap[key] = item.tags.map((t, ti) => colors[(key + ti) % colors.length]);
      } else {
        newTagColorMap[key] = [];
      }
    });
    setImageMap((prev) => ({ ...newImageMap, ...prev }));
    setTagColorMap((prev) => ({ ...newTagColorMap, ...prev }));
  }, [AllPostData]);

  const bumpVisualsForItem = (itemId) => {
    if (!itemId) return;
    setImageMap((prev) => {
      const current = prev[itemId];
      let next = current;
      for (let i = 0; i < 10; i++) {
        const candidate = imageSources[Math.floor(Math.random() * imageSources.length)];
        if (candidate !== current) {
          next = candidate;
          break;
        }
      }
      return { ...prev, [itemId]: next };
    });
    setTagColorMap((prev) => {
      const current = prev[itemId] || [];
      const rotated = current.length
        ? current.map((c, i) => colors[(colors.indexOf(c) + 1 + i) % colors.length])
        : [];
      return { ...prev, [itemId]: rotated };
    });
  };

  return (
    <div>
      <div className="dashboard-card">
        {currentUsers.map((item) => (
          <div key={item.id}>
            {" "}
            {/* Remember to add a unique 'key' prop */}
            <Card
              hoverable
              onClick={() => handleView(item)}
              style={{ width: "250px" }}
              cover={
                <Avatar
                  className="post-avatar-card"
                  src={getRandomImageUrl(imageSources)}
                  size={"large"}
                ></Avatar>
              }
              className="card-with-hover"
            >
              <Meta
                title={
                  <div>
                    <Flex gap={5}>
                    {item?.tags?.map((tag)=>(
                      <Tag color={getRandomColr(colors)}>{tag}</Tag>
                    ))}</Flex>
                    <Flex vertical>
                    {item?.AllPostData?.tags}
                    <Title  ellipsis style={{maxWidth: '200px' ,marginTop:"5px"}} level={4}>{item.title}</Title>
                    </Flex>
                  </div>}
                style={{ textAlign: "center" }}
                description={
                  <Paragraph style={{textAlign:"start"}} ellipsis={{ rows: 2 }}>{item.body}</Paragraph>
                  }
              />
              <div className="hover-buttons">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  className="hover-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(item.id);
                  }}
                />
                <Popconfirm
                  title="Are you sure to delete this user"
                  placement="top"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                >
                  <Button
                    type="primary"
                    danger
                    shape="circle"
                    loading={loading}
                    icon={<DeleteOutlined />}
                    className="hover-button"
                  />
                </Popconfirm>
              </div>
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
