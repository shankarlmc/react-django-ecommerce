import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
  // add to favourite
  FAVORITE_ADD_ITEM,
  FAVORITE_REMOVE_ITEM,
  FAVORITE_CLEAR_ITEMS,
} from "../constants/cartConstants";

export const addToCart = (slug, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v0.1/products/${slug}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data.slug,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (slug) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: slug,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

export const resetCartOnLogout = () => (dispatch) => {
  localStorage.removeItem("cartItems");
  dispatch({ type: CART_CLEAR_ITEMS });
};

export const addToFavorite = (slug) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v0.1/products/${slug}`);

  dispatch({
    type: FAVORITE_ADD_ITEM,
    payload: {
      product: data.slug,
      slug: data.slug,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty: 1,
      rating: data.rating,
      numReviews: data.numReviews,
    },
  });
  localStorage.setItem(
    "favoriteItems",
    JSON.stringify(getState().wishList.favoriteItems)
  );
};

export const removeFromFavorite = (slug) => async (dispatch, getState) => {
  dispatch({
    type: FAVORITE_REMOVE_ITEM,
    payload: slug,
  });

  localStorage.setItem(
    "favoriteItems",
    JSON.stringify(getState().wishList.favoriteItems)
  );
};

export const resetFavoriteOnLogout = () => (dispatch) => {
  localStorage.removeItem("favoriteItems");
  dispatch({ type: FAVORITE_CLEAR_ITEMS });
};
