import { VIEW_ON_BOARDING } from "../actions/localDataActions";

const initialState = {
    viewOnBoarding: null,
  };

export const localDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
      
    case VIEW_ON_BOARDING:
        return {
            ...state,
            viewOnBoarding: action.payload
        }

    default:
      return state
  };
};