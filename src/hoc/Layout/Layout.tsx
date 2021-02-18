import React, { Component, FunctionComponent } from "react";
import classes from "./Layout.module.scss";

import Aux from "../Auxiliary/Auxiliary";

import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";

class Layout extends Component<{}, FunctionComponent> {
  render() {
    return (
      <Aux>
        <div className={classes["background"]}></div>
        <div className={classes["layout__container"]}>
          <div className={classes["layout__navigation"]}>
            <Navigation />
          </div>

          <main className={classes["layout__content"]}>
            {this.props.children}
          </main>

          <div className={classes["layout__footer"]}>
            <Footer />
          </div>
        </div>
      </Aux>
    );
  }
}

export default Layout;
