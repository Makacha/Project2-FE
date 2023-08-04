import React, {useState} from "react";
import { Link } from 'react-router-dom';
import {Layout, Menu} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import classNames from 'classnames';
import {IRoute} from "../../../interfaces";
import { commonHooks } from '../../../hooks';

const { useAppMenu } = commonHooks;

const {Sider} = Layout;
const { SubMenu } = Menu;

interface AppSiderProps {
  filteredNavigation: IRoute[];
}
const AppSider: React.FC<AppSiderProps> = (props) => {
  const { filteredNavigation } = props;
  const { selectedKey, openKey } = useAppMenu(filteredNavigation)

  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed((collapsed) => !collapsed);
  };


  return (
    <Sider
      className={classNames({
        'app-sider': true,
        collapsed: collapsed,
      })}
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={270}
    >
      {collapsed ? (
        <MenuUnfoldOutlined
          data-testid="menu-expand-icon"
          className="app-icon app-trigger"
          onClick={toggle}
        />
      ) : (
        <MenuFoldOutlined
          data-testid="menu-collapse-icon"
          className="app-icon app-trigger"
          onClick={toggle}
        />
      )}

      <Menu
        className="app-menu"
        theme="dark"
        mode="inline"
        defaultOpenKeys={[openKey]}
        selectedKeys={[selectedKey]}
      >
        {filteredNavigation.map((item) => {
          if (!item.icon) return null;
          if (!item.children) {
            return (
              <Menu.Item key={item.path}>
                {item.component ? (
                  <Link to={item.path}>
                    <item.icon className="app-icon" />
                    <span>{item.name}</span>
                  </Link>
                ) : (
                  <a href={item.path}>
                    <item.icon className="app-icon" />
                    <span>{item.name}</span>
                  </a>
                )}
              </Menu.Item>
            );
          } else {
            const { children } = item;
            const levelTwoItems = filteredNavigation.filter((child) =>
              children.includes(child.path)
            );
            return (
              <SubMenu
                key={item.path}
                title={
                  <span>
                    <item.icon className="app-icon" />
                    <span>{item.name}</span>
                  </span>
                }
              >
                {levelTwoItems.map((levelTwoItem) => {
                  if (!levelTwoItem.children) {
                    return (
                      <Menu.Item key={levelTwoItem.path}>
                        {levelTwoItem.component ? (
                          <Link to={levelTwoItem.path}>
                            <span>{levelTwoItem.name}</span>
                          </Link>
                        ) : (
                          <a href={levelTwoItem.path}>
                            <span>{levelTwoItem.name}</span>
                          </a>
                        )}
                      </Menu.Item>
                    );
                  } else {
                    const { children } = levelTwoItem;
                    const levelThreeItems = filteredNavigation.filter((child) =>
                      children.includes(child.path)
                    );
                    return (
                      <SubMenu
                        key={levelTwoItem.path}
                        title={levelTwoItem.name}
                      >
                        {levelThreeItems.map((levelThreeItems) => (
                          <Menu.Item key={levelThreeItems.path}>
                            {levelThreeItems.component ? (
                              <Link to={levelThreeItems.path}>
                                <span>{levelThreeItems.name}</span>
                              </Link>
                            ) : (
                              <a href={levelThreeItems.path}>
                                <span>{levelThreeItems.name}</span>
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </SubMenu>
                    );
                  }
                })}
              </SubMenu>
            );
          }
        })}
      </Menu>

    </Sider>
  );
};

export default AppSider;