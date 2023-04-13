import { Middleware } from "redux";
import { RootState } from "./store";

/** 觀察這三個 middleware 執行後，console.log 的順序 */

export const logger: Middleware<{}, RootState> = (store) => (next) => (action) => {
    //dispatch 時要執行的動作
    // console.log("dispatching", action);
    let result = next(action);
    //dispatch 後要執行的動作
    // console.log("next state", store.getState());
    return result;
};

export const customMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
    // console.log("custom dispatching")
    let result = next(action);
    // console.log("after custom dispatching")
    return result;
}

//error handling middleware
export const crashReporter: Middleware<{}, RootState> = (store) => (next) => (action) => {
    try {
        // console.log("crashReporter dispatching")
        let result = next(action)
        // console.log("crashReporter next state", store.getState())
        return result;
    } catch (err) {
        console.error("Caught an exception!", err);
        throw err;
    }
};
