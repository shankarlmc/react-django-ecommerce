import axios from "axios";
import {
  // product list constants
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
  BRAND_LIST_FAIL,
  // product BRAND create constants
  BRAND_CREATE_REQUEST,
  BRAND_CREATE_SUCCESS,
  BRAND_CREATE_FAIL,
  //product BRAND create constants
  BRAND_UPDATE_REQUEST,
  BRAND_UPDATE_SUCCESS,
  BRAND_UPDATE_FAIL,
  // brand delete constants
  BRAND_DELETE_REQUEST,
  BRAND_DELETE_SUCCESS,
  BRAND_DELETE_FAIL,
} from "../constants/brandConstants";

// list brand action
export const listBrands = () => async (dispatch) => {
  try {
    dispatch({ type: BRAND_LIST_REQUEST });
    const { data } = await axios.get(`/api/v0.1/brands`);
    dispatch({
      type: BRAND_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BRAND_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// product brand create action
export const createBrand = (brand) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BRAND_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `/api/v0.1/brands/create/`,
      brand,
      config
    );

    dispatch({
      type: BRAND_CREATE_SUCCESS,
      payload: data,
    });

    // catch error else
  } catch (error) {
    dispatch({
      type: BRAND_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// update category action
export const updateBrand = (brand) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BRAND_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.put(
      `/api/v0.1/brands/update/${brand._id}/`,
      brand,
      config
    );

    dispatch({
      type: BRAND_UPDATE_SUCCESS,
      payload: data,
    });

    // catch error else
  } catch (error) {
    dispatch({
      type: BRAND_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// delete brand action
export const deleteBrand = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BRAND_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.delete(
      `/api/v0.1/brands/delete/${id}`,
      config
    );

    dispatch({
      type: BRAND_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BRAND_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
