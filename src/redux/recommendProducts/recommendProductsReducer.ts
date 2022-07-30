import { Switch } from "antd";
import {
  RecommendProductsActionTypes,
  FETCH_RECOMMEND_PRODUCTS_START,
  FETCH_RECOMMEND_PRODUCTS_FAIL,
  FETCH_RECOMMEND_PRODUCTS_SUCCESS,
} from "./recommendProductsActions";

export interface recommendProductsState {
  productList: any[];
  loading: boolean;
  error: string | null;
}

const defaultState: recommendProductsState = {
  loading: true,
  error: null,
  productList: [],
};

export default (state = defaultState, action: RecommendProductsActionTypes) => {
  switch (action.type) {
    case FETCH_RECOMMEND_PRODUCTS_START:
      return { ...state, loading: true };
    case FETCH_RECOMMEND_PRODUCTS_SUCCESS:
      return { ...state, loading: false, productList: action.payload };
    case FETCH_RECOMMEND_PRODUCTS_FAIL:
      return { ...state, loading: false, productList: action.payload };
    default:
      return state;
  }
};
