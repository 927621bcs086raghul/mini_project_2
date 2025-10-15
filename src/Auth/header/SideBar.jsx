import React from 'react';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;
const SideBar = ({ selectedKey, onSelect, collapsed, onCollapse, menuItems }) => {
  return (
    <Sider
      className="dashboard-sider"
      breakpoint="lg"
      width={150}
      collapsedWidth={0}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => onCollapse(value)}
    >
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        defaultSelectedKeys={[String(menuItems?.[0]?.key ?? '1')]}
        onSelect={onSelect}
        items={menuItems}
      />
    </Sider>
  );
};

export default SideBar;
