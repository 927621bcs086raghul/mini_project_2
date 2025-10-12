import { Tabs, Table, Flex, Avatar, Button,Popconfirm} from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./DashboardTable.css";
import { getUserdataReq, modalOperatorOpen,deleteUserRequest } from "../../redux/utils";

const DashboardTable = () => {
  const { allUserLoading, AllUser, total, modalValue,loading,loadingId } = useSelector(
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
              onClick={() => {
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
          onConfirm={()=>{handleDelete(record.key)}}
        >
            <Button
              type="primary"
              className="create-user-edit-delete-table-button"
              danger
              // loading={loadingId==record.key}
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
    ></Table>
  );
};

export default DashboardTable;
