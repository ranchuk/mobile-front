import {
  ADD_CART,
  // REMOVE_CAR,
  GET_ALL_PRODUCTS
  // LOGOUT
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
      if (action.payload.status) {
        return {
          ...state
        };
      }
      break;

    // case REMOVE_CAR:
    //   const cars = state.cars.filter(car => {
    //     return action.payload.data["carNumber"] !== car["carNumber"];
    //   });
    //   return {
    //     ...state,
    //     cars,
    //     loading: false,
    //     errorRemove: "",
    //     successRemove: `Car number ${
    //       action.payload.data.carNumber
    //     } Removed succesfully`
    //   };

    // case LOGOUT:
    //   return {
    //     ...state,
    //     cars: [],
    //     times: [],
    //     loading: false
    //   };

    default:
      return state;
  }
}
