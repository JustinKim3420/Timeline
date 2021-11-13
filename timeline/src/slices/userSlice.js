import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name:'user',
    initialState:{
        value:false
    },
    reducers:{
        login: (state)=>{
            state.value = !state.value
        }
    }
})

export const {burgerClick} = userSlice.actions

export default userSlice.reducer