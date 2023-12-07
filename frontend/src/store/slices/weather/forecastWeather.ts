import { createSlice } from "@reduxjs/toolkit";

const addForecastWeather = (state, action) => {
    // Constructing a new todos array immutably and return it
    state.push(action.payload);
}

export const forecastWeatherSlice = createSlice({
    initialState: {},
    name: 'forecast-weather',
    reducers: {
        addForecast: addForecastWeather
    }
})

export const { addForecast } = forecastWeatherSlice.actions;
export default forecastWeatherSlice.reducer;