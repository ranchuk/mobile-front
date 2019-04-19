import {
  ADD_CART,
  REMOVE_CART,
  GET_ALL_PRODUCTS,
  GET_CART_PRODUCTS,
  GET_USER_PRODUCTS,
  REMOVE_MY_PRODUCT,
  ADD_PRODUCT
} from "../actions/types";

const initialState = {
  userProducts: [],
  cartProducts: [],
  allProducts: [],
  errorAdd: "",
  successAdd: "",
  errorRemove: "",
  successRemove: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      const allProducts = action.payload.data.data;

      return {
        ...state,
        errorAdd: "",
        successAdd: "",
        errorRemove: "",
        successRemove: "",
        allProducts: [...allProducts],
        loading: false
      };

    case ADD_CART:
      return {
        ...state,
        cartProducts: [...action.payload.data.data]
      };

    case ADD_PRODUCT:
      if (action.payload.status) {
        return {
          ...state
        };
      }
      break;
    case GET_CART_PRODUCTS:
      const cartProducts = action.payload.data.data;
      return {
        ...state,
        cartProducts: [...cartProducts],
        loading: false
      };

    case GET_USER_PRODUCTS:
      const userProducts = action.payload.data.data;
      return {
        ...state,
        userProducts: [...userProducts],
        loading: false
      };

    case REMOVE_CART:
      const cartProductsFiltered = state.cartProducts.filter(product => {
        return (
          action.payload.data["productId"].toString() !==
          product["productId"].toString()
        );
      });
      return {
        ...state,
        cartProducts: [...cartProductsFiltered],
        loading: false,
        errorRemove: "",
        successRemove: `Item number ${
          action.payload.data.productId
        } Removed succesfully`
      };

    case REMOVE_MY_PRODUCT:
      const myProductsFiltered = state.userProducts.filter(product => {
        return (
          action.payload.data["productId"].toString() !==
          product["productId"].toString()
        );
      });
      return {
        ...state,
        userProducts: [...myProductsFiltered],
        loading: false,
        errorRemove: "",
        successRemove: `Item number ${
          action.payload.data.productId
        } Removed succesfully`
      };

    default:
      return state;
  }
}
