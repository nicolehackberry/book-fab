import { VIEW_ON_BOARDING, LOCATIONS_FROM_FS } from "../actions/localDataActions";

const initialState = {
    viewOnBoarding: null,
    creatorLocations: null,
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

    default:
      return state
  };
};