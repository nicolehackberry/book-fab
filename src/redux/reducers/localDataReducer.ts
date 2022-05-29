import {
  VIEW_ON_BOARDING,
  LOCATIONS_FROM_FS,
  UAE_USER_LOCATION,
  REGISTER_USER_FS,
  LOGIN_USER,
  FETCH_LOGEDIN_USER
} from "../actions/localDataActions";

const initialState = {
  viewOnBoarding: null,
  creatorLocations: null,
  useUserLocation: null,
  registerUser: null,
  loggingInUser: null,
  currentUser: null,
};

export const localDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case VIEW_ON_BOARDING:
      return {
        ...state,
        viewOnBoarding: action.payload,
      };
    case LOCATIONS_FROM_FS:
      return {
        ...state,
        creatorLocations: action.payload,
      };
    case UAE_USER_LOCATION:
      return {
        ...state,
        useUserLocation: action.payload,
      };
    case REGISTER_USER_FS:
      return {
        ...state,
        registerUser: action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        loggingInUser: action.payload,
      };
    case FETCH_LOGEDIN_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    default:
      return state;
  }
};
