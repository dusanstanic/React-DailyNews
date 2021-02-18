import React, { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router";
import classes from "./app.module.scss";
import Home from "./container/Home/Home";
import * as newsDataActions from "./store/actions/index";

import Layout from "./hoc/Layout/Layout";
import Article from "./shared/models/Article";
import Category from "./container/Category/Category";

interface PropsI extends RouteComponentProps {
  initNews: Function;
  articles: Article[];
}

const App: FunctionComponent<PropsI> = ({ initNews, history }) => {
  useEffect(() => {
    initNews();
    history.push({ pathname: "/home" });
  }, []);

  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/category" component={Category} />
        </Switch>
      </Layout>
    </div>
  );
};

const mapStateToProp = (state: any) => {
  return {
    articles: state.newsData.articles,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    initNews: () => dispatch(newsDataActions.initNews()),
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(withRouter(App));
