import Article from "../../shared/models/Article";
import * as actionTypes from "../actions/actionTypes/articleData";
import { ActionTypes } from "../actions/articleData";

interface NewsDataState {
  articles: Article[];
  error: boolean;
  country: string;
  category: string;
}

const initialState: NewsDataState = {
  articles: [],
  error: false,
  country: "au",
  category: "sports",
};

const newsData = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case actionTypes.FETCH_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        articles: action.payload.articles,
        country: action.payload.country,
        category: action.payload.category,
      };
    case actionTypes.FETCH_FAILED:
      return { ...state, error: true };
    default:
      return state;
  }
};

export default newsData;
