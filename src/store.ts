import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todo";
import { logger, customMiddleware, crashReporter } from "./middleware";
import { combineReducers } from "redux";
import { todoApiService } from "./services/todoApi";

const reducers = combineReducers({
    todoReducer,
    [todoApiService.reducerPath]: todoApiService.reducer,
});

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(logger, customMiddleware, crashReporter)
            .concat(todoApiService.middleware),
});

// 尚未 combine reducers 和使用 middleware 時的寫法
// export type RootState = ReturnType<typeof store.getState>
export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

export default store;
