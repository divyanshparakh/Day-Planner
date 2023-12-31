import { createSlice } from "@reduxjs/toolkit";

const addItemToArray = (state, action) => {
    const data = action.payload;
    // Constructing a new todos array immutably and return it
    if(state !== data)
        return (state = data);
    return state;
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