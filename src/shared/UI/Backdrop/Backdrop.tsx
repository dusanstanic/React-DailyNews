import React, { FC } from "react";

import classes from "./Backdrop.module.scss";

interface PropsI {
  show: boolean;
  close: Function;
}

const Backdrop: FC<PropsI> = ({ show, close }) => {
  const cssClasses = [classes["backdrop"]];
  if (show) {
    cssClasses.push(classes["show"]);
  }

  return <div className={cssClasses.join(" ")} onClick={() => close()}></div>;
};

export default Backdrop;
