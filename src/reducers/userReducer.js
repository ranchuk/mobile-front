import {
  LOGIN,
  LOGIN_LOADING,
  LOGOUT_LOADING,
  LOGOUT,
  EDIT
  // EDIT_LOADING
} from "../actions/types";

const initialState = {
  userData: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      if (action.payload.data.status === "authorized") {
        const {
          username,
          firstName,
          lastName,
          phoneNumber,
          password
        } = action.payload.data.data;
        return {
          userData: {
            username,
            firstName,
            lastName,
            password,
            phoneNumber
          },
          loading: false
        };
      } else {
        return {
          ...state,
          loading: false
        };
      }
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true
      };
    case LOGOUT:
      sessionStorage.removeItem("userData");
      return {
        userData: {},
        loading: false
      };
    case LOGOUT_LOADING:
      return {
        ...state,
        loading: true
      };

    case EDIT:
      const {
        username,
        firstName,
        lastName,
        phoneNumber,
        password
      } = action.payload.data.data;
      var userData = {
        username,
        firstName,
        lastName,
        phoneNumber,
        password
      };
      sessionStorage.setItem("userData", JSON.stringify(userData));
      return {
        userData,
        loading: false
      };

    // case EDIT_LOADING:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    default:
      return state;
  }
}
