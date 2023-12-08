import { createSlice } from "@reduxjs/toolkit";

const addEventsToArray = (state, action) => {
    const data = action.payload;
    // Constructing a new todos array immutably and return it
    if(state !== data)
        return (state = data);
    return state;
}

const removeEventsToArray = (state, action) => {
    // Constructing a new todos array immutably and return it
    return state.filter(todo => todo.id !== action.payload);
}

export const todosSlice = createSlice({
    initialState: [],
    name: 'weather',
    reducers: {
        addEvent: addEventsToArray,
        removeEvent: removeEventsToArray
    },
});

export const { addEvent: addTodo, removeEvent: deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;