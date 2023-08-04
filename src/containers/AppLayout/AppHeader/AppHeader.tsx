import React, {useContext} from "react";
import {Layout, Dropdown} from 'antd';
import type {MenuProps} from 'antd';
import {DownOutlined, LogoutOutlined} from '@ant-design/icons';
import {userHelpers} from '../../../helpers'
import {StoreContext} from "../../../contexts";

const {Header} = Layout;

const AppHeader: React.FC = () => {

  const { currentUser } = useContext(StoreContext);
  const items: MenuProps['items'] = [
    {
      label: <div data-testid="btn-logout" onClick={userHelpers.logout}>
        <LogoutOutlined />
        <span className="mr-half"> {('Đăng xuất')}</span>
      </div>,
      key: '0',
    },
  ];

  return (
    <Header className="app-header">
      <Dropdown menu={{items}} trigger={['click']}>
        <span className="app-user">
          <span className="name">{currentUser.fullName}</span>
          <DownOutlined/>
        </span>
      </Dropdown>
    </Header>);
};

export default AppHeader;
