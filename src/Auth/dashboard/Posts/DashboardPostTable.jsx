import { Tabs, Table, Flex, Avatar, Button, Popconfirm, Tag } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../DashboardUserTable.css";
import { useNavigate } from "react-router-dom";

const DashboardPostTable = () => {
  const { AllPostData, loading, AllPostLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tagsColor, setTagsColor] = useState({});
  const colorRef = useRef({});

  useEffect(() => {
    if (!AllPostData || !Array.isArray(AllPostData)) return;

    const color = { ...colorRef.current };

    AllPostData.forEach((post) => {
      const tags = post?.tags || [];
      tags.forEach((tag) => {
        if (color[tag] === undefined) {
          color[tag] = getRandomRGBA();
        }
      });
    });

    colorRef.current = color;
    setTagsColor(color);
  }, [AllPostData]);

  function getRandomRGBA() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = 0.8;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  const dataSource = AllPostData?.map((user) => ({
    key: user.id,
    title: user.title,
    reactions: user.reactions?.likes,
    views: user.views,
    userId: user.userId,
    postTags: user.tags,
  }));

  const handleView = (record) => {
    navigate(`/dashboard/post/${record.key}`);
  };

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
      title: "Tags",
      dataIndex: "tags",
      render: (_, record) => {
        const tags = record?.postTags || [];
        return (
          <>
            {tags.map((tag) => (
              <Tag key={tag} color={tagsColor[tag]}>
                {tag}
              </Tag>
            ))}
          </>
        );
      },
    },
    {
      title: "Action",
      render: (_, record) => (
        <Flex gap={15}>
          <Button
            className="create-post-view-table-button"
            onClick={(e) => {
              e.stopPropagation(); // prevent triggering row click
              handleView(record);
            }}
          >
            View
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      className="user-table"
      dataSource={dataSource}
      loading={AllPostLoading || loading}
      scroll={{ y: 390, x: "max-content" }}
      pagination={{ showSizeChanger: false }}
      onRow={(record) => ({
        onClick: () => handleView(record),
      })}
    />
  );
};

export default DashboardPostTable;
