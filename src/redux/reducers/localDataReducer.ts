import { VIEW_ON_BOARDING, LOCATIONS_FROM_FS, UAE_USER_LOCATION, REGISTER_USER_FS } from "../actions/localDataActions";

const initialState = {
    viewOnBoarding: null,
    creatorLocations: null,
    useUserLocation: null,
    registerUser: null,
  };

export const localDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
      
    case VIEW_ON_BOARDING:
        return {
            ...state,
            viewOnBoarding: action.payload
        };
    case LOCATIONS_FROM_FS: 
        return {
          ...state,
          creatorLocations: action.payload
        };
    case UAE_USER_LOCATION: 
        return {
          ...state,
          useUserLocation: action.payload
        };
    case REGISTER_USER_FS:
      return {
        ...state,
        registerUser: action.payload
      };

    default:
      return state
  };
};