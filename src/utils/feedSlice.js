import { createSlice } from "@reduxjs/toolkit";


const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
        removeFeed: (state, action) => {
            return null;
        },
        removeUserFromFeed: (state, action) => {
            const newArray = state.filter(req => req._id !== action.payload);
            return newArray;
        }
    }
})

export const {addFeed, removeFeed, removeUserFromFeed} = feedSlice.actions
export default feedSlice.reducer