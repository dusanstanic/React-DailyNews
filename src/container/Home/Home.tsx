import classes from "./Home.module.scss";
import { Component } from "react";
import { connect } from "react-redux";
import ArticleM from "../../shared/models/Article";

import Aux from "../../hoc/Auxiliary/Auxiliary";

import * as newsDataActions from "../../store/actions/index";
import Modal from "../../shared/UI/Modal/Modal";
import Article from "../../components/Article/Article";
import SearchParams from "../../shared/models/SearchParams";
import Store from "../../shared/models/StoreI";

interface PropsI {
  fetchArticles: (searchParams: SearchParams) => void;
  articles: ArticleM[];
}

interface StateI {
  showModal: boolean;
  article?: ArticleM;
}

class Home extends Component<PropsI, StateI> {
  state = { showModal: false, article: undefined };

  componentDidUpdate() {}

  handleModal = (article: ArticleM) => {
    this.setState({
      article: article,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  renderArticles = () => {
    return this.props.articles.map((article, index) => {
      return (
        <Article key={index} article={article} handleModal={this.handleModal} />
      );
    });
  };

  render() {
    return (
      <Aux>
        <Modal show={this.state.showModal} close={this.closeModal}>
          <Article
            article={this.state.article}
            handleModal={this.handleModal}
          />
        </Modal>
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
                onClick={() => this.props.fetchArticles({ country: "au" })}
              >
                AU
              </div>
              <div
                className={classes["select__option"]}
                onClick={() => this.props.fetchArticles({ country: "fr" })}
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

const mapStateToProp = (state: Store) => {
  return {
    articles: state.articleData.articles,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchArticles: (searchParams: SearchParams) => {
      dispatch(
        newsDataActions.fetchArticles({
          country: searchParams.country,
          category: searchParams.category,
        })
      );
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(Home);
