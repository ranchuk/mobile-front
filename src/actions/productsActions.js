import axios from "axios";
import config from "../config/config";

import {
  GET_USER_PRODUCTS,
  GET_ALL_PRODUCTS,
  ADD_CART,
  REMOVE_CART,
  GET_CART_PRODUCTS,
  REMOVE_MY_PRODUCT,
  ADD_PRODUCT
} from "./types";

export const getUserProducts = username => {
  const response = axios.get(
    `${config.host}/getAllUserProducts?username=${username}`
  );
  return {
    type: GET_USER_PRODUCTS,
    payload: response
  };
};
export const getAllProducts = () => {
  const response = axios.get(`${config.host}/get_all_products`);
  return {
    type: GET_ALL_PRODUCTS,
    payload: response
  };
};
export const getCartProducts = username => {
  const response = axios.get(
    `${config.host}/get_cart_products?username=${username}`
  );
  return {
    type: GET_CART_PRODUCTS,
    payload: response
  };
};
export const addCart = data => {
  const response = axios.post(`${config.host}/add_cart`, data);
  return {
    type: ADD_CART,
    payload: response
  };
};

export const addProduct = data => {
  const response = axios.post(`${config.host}/add_product`, data);
  return {
    type: ADD_PRODUCT,
    payload: response
  };
};

export const removeCart = data => {
  const response = axios.post(`${config.host}/remove_cart`, data);

  return {
    type: REMOVE_CART,
    payload: response
  };
};

export const removeMyProduct = data => {
  const response = axios.post(`${config.host}/remove_my_product`, data);

  return {
    type: REMOVE_MY_PRODUCT,
    payload: response
  };
};
