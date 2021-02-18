import classes from "./Home.module.scss";
import { Component } from "react";
import { connect } from "react-redux";
import Article from "../../shared/models/Article";

import Aux from "../../hoc/Auxiliary/Auxiliary";

import * as newsDataActions from "../../store/actions/index";

interface PropsI {
  fetchByCountry: Function;
  articles: Article[];
}

class Home extends Component<PropsI, {}> {
  componentDidUpdate() {}

  renderArticles = () => {
    return this.props.articles.map((article) => {
      return (
        <Aux key={article.title}>
          <div className={classes["article"]}>
            <div className={classes["article__image-wrapper"]}>
              <img
                src={article.urlToImage}
                className={classes["article__image"]}
              />
            </div>
            <div className={classes["article__title"]}>
              <h3>{article.title}</h3>
            </div>
          </div>
        </Aux>
      );
    });
  };

  render() {
    return (
      <Aux>
        <div className={classes["home"]}>
          <div className={classes["home__main"]}>
            <div className={classes["home__heading"]}>
              <h2 className={classes["home__title"]}>Top News</h2>
            </div>
          </div>
          <div className={classes["select"]}>
            <div className={classes["select__title"]}>Select Country</div>
            <div className={classes["select__options"]}>
              <div
                className={classes["select__option"]}
                onClick={() => this.props.fetchByCountry("au")}
              >
                AU
              </div>
              <div
                className={classes["select__option"]}
                onClick={() => this.props.fetchByCountry("fr")}
              >
                FR
              </div>
            </div>
          </div>
          <div className={classes["articles"]}>{this.renderArticles()}</div>
        </div>
      </Aux>
    );
  }
}

const mapStateToProp = (state: any) => {
  return {
    articles: state.newsData.articles,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchByCountry: (country: string) =>
      dispatch(newsDataActions.fetchByCountry(country)),
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(Home);
