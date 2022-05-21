import { configureStore } from '@reduxjs/toolkit'

import { localDataReducer } from './reducers/localDataReducer'

export const store = configureStore({
  reducer: {
    localData: localDataReducer,
  }
});