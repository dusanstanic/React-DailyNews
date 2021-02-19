import { connect } from "react-redux";
import Article from "../../shared/models/Article";
import SearchParams from "../../shared/models/SearchParams";
import * as articleService from "../../shared/services/article";

import * as actionTypes from "./actionTypes/articleData";

const articleDataCheckState = () => {
  return (dispatch: any) => {
    const country = localStorage.getItem("country");
    const category = localStorage.getItem("category");

    dispatch(fetchArticles({ country: country, category: category }));
  };
};

const fetchArticles = (searchParams: SearchParams) => {
  return async (dispatch: any, getState: Function) => {
    let country = getState().newsData.country;
    let category = getState().newsData.category;

    if (searchParams.country) {
      country = searchParams.country;
      localStorage.setItem("country", country);
    }

    if (searchParams.category) {
      category = searchParams.category;
      localStorage.setItem("category", category);
    }

    try {
      const articles = await articleService.fetch({ country, category });
      dispatch(fetchSuccess(articles, { country, category }));
    } catch {
      console.log("Error");
      dispatch(fetchFailed());
    }
  };
};

const fetchSuccess = (articles: any[], searchParams: SearchParams) => {
  return {
    type: actionTypes.FETCH_SUCCESS,
    payload: {
      articles,
      country: searchParams.country,
      category: searchParams.category,
    },
  };
};

const fetchFailed = () => {
  return {
    type: actionTypes.FETCH_FAILED,
  };
};

export { fetchArticles, articleDataCheckState };

interface FetchSuccessAction {
  type: typeof actionTypes.FETCH_SUCCESS;
  payload: { articles: Article[]; country: string; category: string };
}

interface FetchFailedAction {
  type: typeof actionTypes.FETCH_FAILED;
}

export type ActionTypes = FetchSuccessAction | FetchFailedAction;
