import { createSlice } from "@reduxjs/toolkit";

const addCurrentWeather = (state, action) => {
    // Constructing a new todos array immutably and return it
    state.push(action.payload);
}

export const currentWeatherSlice = createSlice({
    initialState: {},
    name: 'current-weather',
    reducers: {
        addWeather: addCurrentWeather
    },
});

export const { addWeather } = currentWeatherSlice.actions;
export default currentWeatherSlice.reducer;