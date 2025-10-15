import React, { useEffect, useState } from "react";
import { Tabs, Input, Button } from "antd";
import { SearchOutlined, TableOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import DashboardUserCard from "./dashboard/DashboardUserCard";
import DashboardUserTable from "./dashboard/DashboardUserTable";
import {
  userSearchRequest,
  getAllUserRequest,
  drawerOperatorOpen,
} from "../redux/utils";

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

const itemsuser = [
  {
    key: "Table",
    label: "Table",
    children: <DashboardUserTable />,
    icon: <TableOutlined />,
  },
  {
    key: "card",
    label: "card",
    children: <DashboardUserCard />,
    icon: <UnorderedListOutlined />,
  },
];

export default function UsersView() {
  const dispatch = useDispatch();
  const { AllUser } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  // trigger search when debounced value changes
  useEffect(() => {
    dispatch(userSearchRequest({ search }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // fetch initial users if none present
  useEffect(() => {
    if (!AllUser || AllUser.length === 0) {
      dispatch(getAllUserRequest());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="table-heading" style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Users</h2>
        <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
          <Input
            placeholder="Input search text"
            value={search}
            className="input-search-user-dashboard"
            onChange={(e) => setSearch(e.target.value)}
            suffix={<SearchOutlined className="search-icon" />}
          />
          <Button
            type="primary"
            className="create-user-edit-delete-table-button"
            style={{ marginTop: "19px", borderRadius: 0 }}
            onClick={() => dispatch(drawerOperatorOpen())}
          >
            Create user
          </Button>
        </div>
      </div>

      <Tabs className="card-table-user-view" items={itemsuser}></Tabs>
    </div>
  );
}
