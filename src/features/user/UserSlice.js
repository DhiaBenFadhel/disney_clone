import { createSlice } from "@reduxjs/toolkit";

const initialState = {   // Satrting off BLANK
    name: "",
    email: "",
    photo: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserLoginDetails: (state, action) => { //When LogIn remember all the data
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.photo = action.payload.photo;
        },

        setSignOutState: state => { // When LogOut forget/reset the data
            state.name = null;
            state.email = null;
            state.photo = null;
        },
    },
});

export const { setUserLoginDetails, setSignOutState } = userSlice.actions;

export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserPhoto = (state) => state.user.photo;

export default userSlice.reducer;