import { createSlice } from "@reduxjs/toolkit";

const addCurrentLocation = (state, action) => {
    const data = action.payload;
    if(state !== data)
        return (state = data);
    return state;
}

export const locationSlice = createSlice({
    initialState: {},
    name: 'location',
    reducers: {
        addLocation: addCurrentLocation
    }
})

export const { addLocation } = locationSlice.actions;
export default locationSlice.reducer;