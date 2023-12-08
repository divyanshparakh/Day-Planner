import { createSlice } from "@reduxjs/toolkit";

const addCurrentWeather = (state, action) => {
    const data = action.payload;
    if(state !== data)
        return (state = data);
    return state;
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