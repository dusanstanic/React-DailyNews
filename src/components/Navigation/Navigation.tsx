import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Navigation.module.scss";

import Aux from "../../hoc/Auxiliary/Auxiliary";

const Header = (props: any) => {
  return (
    <Aux>
      <nav className={classes["nav"]}>
        <ul className={classes["nav__items"]}>
          <NavLink to={"/home"} className={classes["nav__item"]}>
            Home
          </NavLink>
          <NavLink to={"/category"} className={classes["nav__item"]}>
            Category
          </NavLink>
          <NavLink to={"/home"} className={classes["nav__item"]}>
            Page3
          </NavLink>
          <NavLink to={"/home"} className={classes["nav__item"]}>
            Page4
          </NavLink>
        </ul>
      </nav>
    </Aux>
  );
};

export default Header;
