import { Avatar, Card, Flex, Pagination,Button,Popconfirm } from "antd";
const { Meta } = Card;
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getUserdataReq,modalOperatorOpen,deleteUserRequest,drawerOperatorViewClose,drawerOperatorViewOpen } from '../../redux/utils';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./DashboardUserCard.css";
const DashboardUserCard = () => {
  const { allUserLoading, AllUser, total,loading,loadingId } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const dispatch=useDispatch();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = AllUser.slice(startIndex, endIndex);

  const handleEdit=(id)=>{
  dispatch(getUserdataReq(id));
    dispatch(modalOperatorOpen({option:'Edit',id:id}));

  }
  const handleDelete =(id) =>{
    dispatch(deleteUserRequest(id))
  }
  const handleView=(item)=>{
    dispatch(getUserdataReq(item.id));
    dispatch(drawerOperatorViewOpen(item.id));
  }
  return (
    <>
      <div className="dashboard-card">
        {currentUsers.map((item) => (
          <div key={item.id}>
            {" "}
            {/* Remember to add a unique 'key' prop */}
            <Card
            hoverable
            onClick={()=>handleView(item)}
              style={{ width: "250px" }}
              cover={
                <Avatar className="avatar-card" src={item.image} size={"large"}>
                  
                </Avatar>
              }
              
              className="card-with-hover"
            >
              <Meta
                title={item.username}
                style={{ textAlign: "center" }}
                description={item.email}
              />
              <div className="hover-buttons">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  className="hover-button"
                  onClick={(e)=>{
                    e.stopPropagation()
                    handleEdit(item.id)}}
                />
                <Popconfirm
                            title="Are you sure to delete this user"
                          placement="top"
                          okText="Yes"
                          cancelText="No"
                          onCancel={(e)=>{
                            e.stopPropagation();
                          }}
                          onConfirm={(e)=>{
                            e.stopPropagation();
                            handleDelete(item.id)}}
                        >
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  loading={loading}
                  icon={<DeleteOutlined />}
                  className="hover-button"
                  onClick={(e)=>{e.stopPropagation()}}
                /></Popconfirm>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <Pagination
        current={currentPage}
        total={AllUser.length}
        showSizeChanger={false}
        pageSize={itemsPerPage}
        onChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default DashboardUserCard;

