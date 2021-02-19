import React, { FC } from "react";
import { CSSTransition } from "react-transition-group";

import Aux from "../../../hoc/Auxiliary/Auxiliary";

import classes from "./Modal.module.scss";

import Backdrop from "../Backdrop/Backdrop";

interface PropsI {
  show: boolean;
  close: Function;
}

const animationTiming = {
  enter: 1000,
  exit: 1000,
};

const Modal: FC<PropsI> = ({ show, children, close }) => {
  return (
    <Aux>
      <Backdrop show={show} close={close} />
      <CSSTransition
        in={show}
        timeout={animationTiming}
        classNames={{
          enterActive: classes["showModal"],
          exitActive: classes["hideModal"],
        }}
        mountOnEnter
        unmountOnExit
      >
        <div className={classes["modal"]}>{children}</div>
      </CSSTransition>
    </Aux>
  );
};

export default Modal;
