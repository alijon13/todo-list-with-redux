import { configureStore } from '@reduxjs/toolkit'
import counter from '../reducers/counter'
import todos from '../reducers/todos'

export const store = configureStore({
  reducer: {
    counter,
    todos,
   
  },
})