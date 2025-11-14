import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await axios.post(
            "http://192.168.3.128:8000/login/",
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.request.message);
    }
});

export const get_info = createAsyncThunk(
    "auth/info",
    async (data, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.get("http://192.168.3.128:8000/user-info/", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.request.message);
        }
    }
);


const initialState = {
    isLoading: false,
    wrongLogin: null,
    isLogged: false,
    userType: null,
    email: null,
    access_token: null,
    name: null,
    avatar: null,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.wrongLogin = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                if (
                    action.payload.detail ===
                    "No active account found with the given credentials" ||
                    action.payload.detail ===
                    "You do not have permission to perform this action."
                ) {
                    state.wrongLogin = true;
                } else {
                    state.isLogged = true;
                    state.access_token = action.payload.access_token;
                    //state.email = action.meta.arg.email;
                    Cookies.set("access_token", state.access_token, { expires: 30 });
                }
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false;
                state.wrongLogin = true;
                state.isLogged = false;
            })


            //get_info
            .addCase(get_info.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(get_info.fulfilled, (state, action) => {
                state.isLoading = false;
                if (
                    action.payload.detail !==
                    "No active account found with the given credentials"
                ) {
                    state.isLogged = true;
                    state.userType = action.payload.user_info.user_type;
                    state.name = action.payload.user_info.name;
                    state.email = action.payload.user_info.email;
                    state.avatar = action.payload.user_info.avatar;
                    //state.access_token = action.meta.arg;
                } else {
                }
            })
            .addCase(get_info.rejected, (state) => {
                state.isLoading = false;
                state.isLogged = false;
            })

    },
});

export default authSlice.reducer;
