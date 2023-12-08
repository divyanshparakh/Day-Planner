import { configureStore } from '@reduxjs/toolkit';
import todosSlice from './slices/todos/index.ts';
import currentWeatherSlice from './slices/weather/currentWeather.ts';
import forecastWeatherSlice from './slices/weather/forecastWeather.ts';
import locationSlice from './slices/weather/location.ts';


export const store = configureStore({
    reducer: {
        todos: todosSlice,
        weather: currentWeatherSlice,
        forecast: forecastWeatherSlice,
        location: locationSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
