import { createSlice } from "@reduxjs/toolkit";

const counterslice = createSlice({

    initialState:0,
    name:'counter',
    reducers:{
        increament:(state)=>state +1,
        decreament:(state)=>state -1,
        byfive:(state,action)=>state + action.payload
    }

})

export const {increament,decreament,byfive} = counterslice.actions;
export default counterslice.reducer;