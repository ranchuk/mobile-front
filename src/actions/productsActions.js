import axios from "axios";
import config from "../config/config";

import { GET_USER_PRODUCTS, GET_ALL_PRODUCTS } from "./types";

export const getUserProducts = username => {
  const response = axios.get(
    `${config.host}/get_all_user_cars?username=${username}`
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

// export const addCar = data => {
//   const response = axios.post(`${config.host}/add_car`, data);
//   return {
//     type: ADD_CAR,
//     payload: response
//   };
// };

// export const removeCar = data => {
//   console.log(data);
//   const response = axios.post(`${config.host}/remove_car`, data);

//   return {
//     type: REMOVE_CAR,
//     payload: response
//   };
// };
