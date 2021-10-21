import {
  // brand list constants
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
  BRAND_LIST_FAIL,
  // brand create constants
  BRAND_CREATE_REQUEST,
  BRAND_CREATE_SUCCESS,
  BRAND_CREATE_FAIL,
  BRAND_CREATE_RESET,
  // brand create constants
  BRAND_UPDATE_REQUEST,
  BRAND_UPDATE_SUCCESS,
  BRAND_UPDATE_FAIL,
  BRAND_UPDATE_RESET,
  // brand delete constants
  BRAND_DELETE_REQUEST,
  BRAND_DELETE_SUCCESS,
  BRAND_DELETE_FAIL,
} from "../constants/brandConstants";

// brand list reducer
export const brandListReducer = (state = { brands: [] }, action) => {
  switch (action.type) {
    case BRAND_LIST_REQUEST:
      return { loading: true, brands: [] };

    case BRAND_LIST_SUCCESS:
      return { loading: false, brands: action.payload };

    case BRAND_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// brand create reducer
export const brandCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BRAND_CREATE_REQUEST:
      return { loading: true };

    case BRAND_CREATE_SUCCESS:
      return { loading: false, success: true, brand: action.payload };

    case BRAND_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case BRAND_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

// brand update reducer
export const brandUpdateReducer = (state = { brand: {} }, action) => {
  switch (action.type) {
    case BRAND_UPDATE_REQUEST:
      return { loading: true };

    case BRAND_UPDATE_SUCCESS:
      return { loading: false, success: true, brand: action.payload };

    case BRAND_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case BRAND_UPDATE_RESET:
      return { brand: {} };

    default:
      return state;
  }
};

// brand delete reducer
export const brandDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BRAND_DELETE_REQUEST:
      return { loading: true };

    case BRAND_DELETE_SUCCESS:
      return { loading: false, success: true };

    case BRAND_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
