import React, { FC } from "react";

import classes from "./Article.module.scss";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import ArticleM from "../../shared/models/Article";

interface PropsI {
  article?: ArticleM;
  handleModal: Function;
}

const Article: FC<PropsI> = ({ article, handleModal }) => {
  if (article) {
    return (
      <Aux>
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
          <div className={classes["article__more"]}>
            <div
              className={classes["article__more-info"]}
              onClick={() => handleModal(article)}
            >
              More &rarr;
            </div>
          </div>
        </div>
      </Aux>
    );
  } else {
    return null;
  }
};

export default Article;
