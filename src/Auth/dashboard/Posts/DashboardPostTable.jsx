import { Tabs, Table, Flex, Avatar, Button,Popconfirm} from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../DashboardUserTable.css";
import { getUserdataReq, modalOperatorOpen,deleteUserRequest, drawerOperatorOpen,drawerOperatorViewOpen } from "../../../redux/utils";
import { useNavigate } from "react-router-dom";

const DashboardPostTable = () => {
  const { allUserLoading, AllPostData, total, modalValue,loading,loadingId } = useSelector(
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
      title: "Created User Id",
      dataIndex: "userId",

    },
    {
      title:"Tags",
      dataIndex:"tags",
      render:(_,record)=>{
        const tags=record?.postTags
        return(
         <p>{tags?.join(', ')}</p>
        )
      }
    },
    {
      title: "Action",
      render: (_, record) => {
        return (
          <Flex gap={15}>
            <Button
              type="primary"
              className="create-user-edit-delete-table-button"
              onClick={(e) => {
                e.stopPropagation()
                handleEdit(record.key);
              }}
            >
              Edit
            </Button>
            <Popconfirm
            title="Are you sure to delete this user"
          placement="top"
          okText="Yes"
          cancelText="No"
          onConfirm={(e)=>{
            e.stopPropagation()
            handleDelete(record.key)}}
        >
            <Button
              type="primary"
              className="create-user-edit-delete-table-button"
              danger
              onClick={(e)=>{
                e.stopPropagation()
              }}
            >
              Delete
            </Button></Popconfirm>
          </Flex>
        );
      },
    },
  ];
  const handleEdit = (id) => {
    dispatch(getUserdataReq(id));
    dispatch(modalOperatorOpen({ option: "Edit", id: id }));
    
  };
  const handleDelete =(id) =>{
    dispatch(deleteUserRequest(id))
  }
  const handleView=(record)=>{
      navigate(`/post/${record.key}`);
  }
  return (
    <Table
      columns={columns}
      className="user-table"
      dataSource={dataSource}
      loading={allUserLoading||loading}
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
