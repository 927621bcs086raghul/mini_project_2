import React, { useEffect, useState } from "react";
import { Tabs, Input } from "antd";
import { SearchOutlined, TableOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import DashboardPostCard from "./dashboard/Posts/DashboardPostCard";
import DashboardPostTable from "./dashboard/Posts/DashboardPostTable";
import { setSeacrhPOst, getAllPostRequest } from "../redux/utils";

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

const itemspost = [
  {
    key: "Table",
    label: "Table",
    children: <DashboardPostTable />,
    icon: <TableOutlined />,
  },
  {
    key: "card",
    label: "card",
    children: <DashboardPostCard />,
    icon: <UnorderedListOutlined />,
  },
];

export default function PostsView() {
  const dispatch = useDispatch();
  const { AllPostData } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    dispatch(setSeacrhPOst({ search }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  useEffect(() => {
    if (!AllPostData || AllPostData.length === 0) {
      dispatch(getAllPostRequest());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="table-heading" style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Posts</h2>
        <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
          <Input
            placeholder="Input search text"
            value={search}
            className="input-search-user-dashboard"
            onChange={(e) => setSearch(e.target.value)}
            suffix={<SearchOutlined className="search-icon" />}
          />
        </div>
      </div>

      <Tabs className="card-table-user-view" items={itemspost}></Tabs>
    </div>
  );
}
