import { Avatar, Card, Flex, Pagination,Button } from "antd";
const { Meta } = Card;
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getUserdataReq,modalOperatorOpen } from '../../redux/utils';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./DashboardCard.css";
const DashboardCard = () => {
  const { allUserLoading, AllUser, total } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const dispatch=useDispatch();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = AllUser.slice(startIndex, endIndex);
  console.log(currentUsers);
const handleEdit=(id)=>{
console.log(id);
 dispatch(getUserdataReq(id));
  dispatch(modalOperatorOpen({option:'edit',id:id}));

}
  return (
    <div>
      <div className="dashboard-card">
        {currentUsers.map((item) => (
          <div key={item.id}>
            {" "}
            {/* Remember to add a unique 'key' prop */}
            <Card
            hoverable
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
                  onClick={()=>handleEdit(item.id)}
                />
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  icon={<DeleteOutlined />}
                  className="hover-button"
                />
              </div>
            </Card>
          </div>
        ))}
      </div>

      <Pagination
        current={currentPage}
        total={AllUser.length}
        showSizeChanger={false}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default DashboardCard;
