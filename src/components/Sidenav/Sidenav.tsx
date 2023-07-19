import * as React from "react";
import { NavLink } from "react-router-dom";
import classes from "./sidenav.module.css";
import { ReactElement } from "react";

type MenuData = {
  name: string;
  route: string;
  menuIcon: ReactElement
};
const SideNav: React.FC<{ menus: MenuData[] }> = (props) => {
  const menuArrays = [...props.menus];
  return (
    <aside className={classes.sidebar}>
      <ul>
        {
          menuArrays.map((menu) => (
            <li key={menu.name}>
              <NavLink
                className={(navData) => (navData.isActive ? classes.active : "")}
                to={menu.route}
              >
                <i className={classes["menu-icon"]}>{menu.menuIcon}</i>
                <span>{menu.name}</span>
              </NavLink>
            </li>
          ))
        }
      </ul>
    </aside>
  );
};

export default SideNav;