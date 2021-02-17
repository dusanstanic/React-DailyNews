import { connect } from "react-redux";
import Article from "../../shared/models/Article";
import * as articleService from "../../shared/services/article";

import * as actionTypes from "./actionTypes/articleData";

const initNews = () => {
  return async (dispatch: any) => {
    try {
      const articles = await articleService.fetchNews();
      dispatch(fetchSuccess(articles));
    } catch {
      console.log("Error");
      dispatch(fetchFailed());
    }
  };
};

const fetchSuccess = (articles: any[]) => {
  return {
    type: actionTypes.FETCH_SUCCESS,
    payload: articles,
  };
};

const fetchFailed = () => {
  return {
    type: actionTypes.FETCH_FAILED,
  };
};

export { initNews };

interface FetchSuccessAction {
  type: typeof actionTypes.FETCH_SUCCESS;
  payload: Article[];
}

interface FetchFailedAction {
  type: typeof actionTypes.FETCH_FAILED;
}

export type ActionTypes = FetchSuccessAction | FetchFailedAction;
