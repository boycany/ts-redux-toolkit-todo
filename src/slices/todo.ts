import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    todoList: Array<string>;
}

const initialState: InitialState = {
    todoList: ['todo1']
    //...if you have more states
};

// Create a slice of the state
export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todoList.push(action.payload);
        },
        addTimeStamp: (state, action) => {
            state.todoList.push(action.payload);
        }
    }
    // Reducers are functions that determine changes to an application's state. 
    // They use the action it receives to determine this change.
});

export const { addTodo, addTimeStamp } = todoSlice.actions;

export default todoSlice.reducer;