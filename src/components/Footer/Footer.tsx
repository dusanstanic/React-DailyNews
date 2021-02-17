import classes from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={classes["footer"]}>
      <ul className={classes["nav"]}>
        <li className={classes["nav__item"]}>
          <a href="#" className={classes["nav__link"]}>
            Contact
          </a>
        </li>
        <li className={classes["nav__item"]}>
          <a href="#" className={classes["nav__link"]}>
            More
          </a>
        </li>
        <li className={classes["nav__item"]}>
          <a href="#" className={classes["nav__link"]}>
            About us
          </a>
        </li>
        <li className={classes["nav__item"]}>
          <a href="#" className={classes["nav__link"]}>
            Company
          </a>
        </li>
      </ul>
      <p className={classes["copyright"]}>
        &copy; Copyright 2021 by Dusan Stanic.
      </p>
    </div>
  );
};

export default Footer;
