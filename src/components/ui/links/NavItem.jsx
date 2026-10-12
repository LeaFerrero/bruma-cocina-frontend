import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styles from "./NavItem.module.css";

function NavItem({ to, text, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
      }
    >
      {text}
    </NavLink>
  );
}

export default NavItem;