import * as CreatorsScreen from "../../screens/CreatorsScreen";
import {
  VIEW_ON_BOARDING,
  LOCATIONS_FROM_FS,
  UAE_USER_LOCATION,
  USER_DATA,
  USER_LOCATION,
  CREATORS_IMAGES,
  CURRENT_CREATOR_DATA_FS,
} from "../actions/localDataActions";

const initialState = {
  viewOnBoarding: null,
  creatorLocations: null,
  useUserLocation: null,
  registerUser: null,
  loggingInUser: null,
  currentUser: null,
  userLocation: null,
  creatorImage: [],
  currentCreatorData: null,
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
    case USER_DATA:
      return {
        ...state,
        currentUser: action.payload,
      };
    case USER_LOCATION:
      return {
        ...state,
        userLocation: action.payload,
      };
    case CREATORS_IMAGES:
      const image = action.payload;
      return {
        ...state,
        creatorImage: [...state.creatorImage, image],
      };
    case CURRENT_CREATOR_DATA_FS:
      return {
        ...state,
        currentCreatorData: action.payload,
      };

    default:
      return state;
  }
};
