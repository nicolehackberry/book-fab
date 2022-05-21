import { IS_FIRST_TIME_USER } from "../actions/localDataActions";

const initialState = {
    isFirstTimeUser: null,
  };

export const localDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
      
    case IS_FIRST_TIME_USER:
        return {
            ...state,
            isFirstTimeUser: action.payload
        }

    default:
      return state
  };
};