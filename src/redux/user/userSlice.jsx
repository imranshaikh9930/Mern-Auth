import { createSlice } from "@reduxjs/toolkit"

const initialState = {
currentUser:null,
loading:false,
error:false
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{

        signInStart:(state)=>{
            state.loading = true;
        }
        ,
        signInSucess:(state,action)=>{
            state.loading = false;
            state.currentUser = action.payload;
            state.error=false;
        },
        signInFailure:(state,action)=>{
            state.loading= false;
            state.error =action.payload;

        }
    }
})

export const {signInFailure,signInStart,signInSucess} = userSlice.actions;

export default userSlice.reducer;