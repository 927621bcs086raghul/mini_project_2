import { Tabs, Table, Flex, Avatar, Button,Popconfirm, Tag} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../DashboardUserTable.css";
import { getUserdataReq, modalOperatorOpen,deleteUserRequest, drawerOperatorOpen,drawerOperatorViewOpen } from "../../../redux/utils";
import { useNavigate } from "react-router-dom";

const DashboardPostTable = () => {
  const { allUserLoading, AllPostData, total, modalValue,loading,loadingId,AllPostLoading } = useSelector(
    (state) => state.auth
  );
  const dataSource = AllPostData?.map((user) => ({
    key: user.id,
    title:user.title,
    reactions: user.reactions.likes,
    views:user.views,
    userId:user.userId,
    postTags:user.tags
  }));
  const [tagsColor,setTagsColor]=useState({});
  useEffect(()=>{
    const color={};
    AllPostData?.map((post)=>{
      const tags=post?.tags;
      tags.map((tag)=>{
        if(color[`${tag}`]==undefined){
          color[`${tag}`]=getRandomRGBA();
        }
      })
    })
    setTagsColor(color);
    console.log(tagsColor);
     function getRandomRGBA() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      const a = 0.8; 
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    };

  },[AllPostData]);
  console.log(tagsColor)
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => (a.title || "").localeCompare(b.title || ""),

    },
    {
      title: "Likes",
      dataIndex: "reactions",
    },
    {
      title: "Views",
      dataIndex: "views",
      },
    {
      title:"Tags",
      dataIndex:"tags",
      render:(_,record)=>{
        const tags=record?.postTags
        return(
         <>{tags?.map((tag)=>{
          return(
            <Tag color={
              tagsColor[tag]
            }>
                {tag}
            </Tag>
          )
         })}</>
        )
      }
    },
    {
      title: "Action",
      render: (_, record) => {
        return (
          <Flex gap={15}>
            <Button
              className="create-post-view-table-button"
              
            >
              View
            </Button>
          </Flex>
        );
      },
    },
  ];

  const handleView=(record)=>{
      navigate(`/dashboard/post/${record.key}`);
  }
  return (
    <Table
      columns={columns}
      className="user-table"
      dataSource={dataSource}
      loading={AllPostLoading||loading}
      scroll={{ y: 390, x: "max-content" }}
      pagination={{
        showSizeChanger: false,
      }}
      onRow={(record)=>{
        return{
          onClick:()=>{handleView(record)}
        }
      }}
      
    ></Table>
  );
};

export default DashboardPostTable;
