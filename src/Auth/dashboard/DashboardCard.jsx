import { Avatar, Card, Flex, Pagination } from "antd";
const { Meta } = Card;
import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./DashboardCard.css";
const DashboardCard = () => {
  const { allUserLoading, AllUser, total } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = AllUser.slice(startIndex, endIndex);
  return (
    <div>
      <div className="dashboard-card">
        {currentUsers.map((item) => (
          <div key={item.id}>
            {" "}
            {/* Remember to add a unique 'key' prop */}
            <Card
              style={{ width: "250px" }}
              cover={<Avatar className="avatar-card"></Avatar>}
            >
              <Meta
                title={item.username}
                style={{ textAlign: "center" }}
                description={item.email}
              />
            </Card>
          </div>
        ))}
      </div>

      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={AllUser.length}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default DashboardCard;
