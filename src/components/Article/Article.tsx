import React, { FC } from "react";

import classes from "./Article.module.scss";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import ArticleM from "../../shared/models/Article";

interface PropsI {
  article?: ArticleM;
  handleModal?: Function;
  dragStart?: Function;
  styleProperties?: {};
}

const Article: FC<PropsI> = ({
  article,
  handleModal,
  styleProperties,
  dragStart,
}) => {
  if (article) {
    return (
      <Aux>
        <div
          className={classes["article"]}
          style={styleProperties}
          onMouseDown={(e) => dragStart?.(e)}
        >
          <div className={classes["article__image-wrapper"]}>
            <img
              src={article.urlToImage}
              className={classes["article__image"]}
            />
          </div>
          <div className={classes["article__title"]}>{article.title}</div>
          <div className={classes["article__more"]}>
            <div
              className={classes["article__more-info"]}
              onClick={() => handleModal?.(article)}
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
