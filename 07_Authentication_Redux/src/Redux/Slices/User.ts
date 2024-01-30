import { createSlice } from "@reduxjs/toolkit";

// Define the interface for the user data
interface UserData {
    _id: string;
    username: string;
    email: string;
    password: string;
    wallet: number;
    transition: {
      id: string;
      amount: number;
      timestamp: string;
    }[];
    __v: number;
  }
  
  // Define the interface for the response object
  interface UserResponse {
    user: UserData;
    accessToken: string;
  }

  // Define the initial state with blank data
const initialState: UserResponse = {
    user: {
      _id: "",
      username: "",
      email: "",
      password: "",
      wallet: 0,
      transition: [],
      __v: 0
    },
    accessToken: ""
  };

 const authUser = createSlice({

    initialState:initialState,
    name:'authUser',
    reducers:{

        saveUserAndToken: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('accessToken', action.payload.accessToken);
        }
    }
})


export const {saveUserAndToken} = authUser.actions;
export default authUser.reducer;
 