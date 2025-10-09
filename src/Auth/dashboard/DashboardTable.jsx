import { Tabs, Table, Flex, Avatar, Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./DashboardTable.css";
import { getUserdataReq, modalOperatorOpen } from "../../redux/utils";

const DashboardTable = () => {
  const { allUserLoading, AllUser, total, modalValue } = useSelector(
    (state) => state.auth
  );
  console.log(AllUser);
  const dataSource = AllUser.map((user) => ({
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
            <Button
              type="primary"
              className="create-user-edit-delete-table-button"
              danger
            >
              Delete
            </Button>
          </Flex>
        );
      },
    },
  ];
  const handleEdit = (id) => {
    dispatch(getUserdataReq(id));
    dispatch(modalOperatorOpen({ option: "edit", id: id }));
  };
  return (
    <Table
      columns={columns}
      className="user-table"
      dataSource={dataSource}
      loading={allUserLoading}
      scroll={{ y: 390, x: "max-content" }}
      pagination={{
        showSizeChanger: false,
      }}
    ></Table>
  );
};

export default DashboardTable;
