import { createSlice } from "@reduxjs/toolkit";

const addForecastWeather = (state, action) => {
    const data = action.payload;
    if(state !== data)
        return (state = data);
    return state;
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