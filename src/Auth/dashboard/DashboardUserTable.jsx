import { Tabs, Table, Flex, Avatar, Button,Popconfirm} from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./DashboardUserTable.css";
import { getUserdataReq, modalOperatorOpen,deleteUserRequest, drawerOperatorOpen,drawerOperatorViewOpen } from "../../redux/utils";

const DashboardUserTable = () => {
  const { allUserLoading, AllUser,postTotal, modalValue,loading,loadingId } = useSelector(
    (state) => state.auth
  );
  const dataSource = AllUser?.map((user) => ({
    key: user.id,
    image: user.image,
    age: user.age,
    email: user.email,
    firstname: user.firstName,
    lastname: user.lastName,
  }));
  const dispatch = useDispatch();
  const columns = [
    {
      title: "",
      dataIndex: "image",
      render: (image) => {
        return (
          <>
            <Avatar src={image}></Avatar>
          </>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => (a.email || "").localeCompare(b.email || ""),
    },
    {
      title: "First name",
      dataIndex: "firstname",
      sorter: (a, b) => (a.firstname || "").localeCompare(b.firstname || ""),
      },
    {
      title: "Last name",
      dataIndex: "lastname",
      sorter: (a, b) => (a.lastname || "").localeCompare(b.lastname || ""),
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
    dispatch(getUserdataReq(record.key));
    dispatch(drawerOperatorViewOpen(record.key));
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

export default DashboardUserTable;
