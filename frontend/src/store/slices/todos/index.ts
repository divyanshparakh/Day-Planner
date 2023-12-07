import { createSlice } from "@reduxjs/toolkit";

const addItemToArray = (state, action) => {
    // Constructing a new todos array immutably and return it
    state.push(action.payload);
}

const deleteItemToArray = (state, action) => {
    // Constructing a new todos array immutably and return it
    return state.filter(todo => todo.id !== action.payload);
}

export const todosSlice = createSlice({
    initialState: [],
    name: 'weather',
    reducers: {
        addTodo: addItemToArray,
        deleteTodo: deleteItemToArray
    },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;