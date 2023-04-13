import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './slices/todo'
import { logger, customMiddleware, crashReporter } from './middleware'
import { combineReducers } from 'redux'

const reducers = combineReducers({
    todoReducer
})

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, customMiddleware, crashReporter)
})

// 尚未 combine reducers 和使用 middleware 時的寫法
// export type RootState = ReturnType<typeof store.getState>
export type RootState = ReturnType<typeof reducers>
export type AppDispatch = typeof store.dispatch

export default store