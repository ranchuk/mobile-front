import {
  ADD_CAR,
  REMOVE_CAR,
  GET_ALL_PRODUCTS,
  LOGOUT
} from "../actions/types";

const initialState = {
  userProducts: [],
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

    // case ADD_CAR:
    //   if (action.payload.status) {
    //     const newCar = {
    //       username: action.payload.data.username,
    //       carNumber: action.payload.data.carNumber,
    //       isInside: 0
    //     };
    //     return {
    //       ...state,
    //       cars: [...state.cars, newCar],
    //       loading: false,
    //       errorAdd: "",
    //       successAdd: `Car number ${
    //         action.payload.data.carNumber
    //       } Added succesfully`
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       cars: [...state.cars],
    //       loading: false,
    //       errorAdd: `Car  number ${
    //         action.payload.data.carNumber
    //       } already exist`,
    //       successAdd: ""
    //     };
    //   }

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
