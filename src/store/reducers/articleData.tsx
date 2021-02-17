import Article from "../../shared/models/Article";
import * as actionTypes from "../actions/actionTypes/articleData";
import { ActionTypes } from "../actions/articleData";

interface NewsDataState {
  articles: Article[];
  error: boolean;
}

const initialState: NewsDataState = {
  articles: [],
  error: false,
};

const newsData = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case actionTypes.FETCH_SUCCESS:
      return { ...state, articles: action.payload };
    case actionTypes.FETCH_FAILED:
      return { ...state, error: true };
    default:
      return state;
  }
};

export default newsData;
