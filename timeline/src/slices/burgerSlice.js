import {createSlice} from '@reduxjs/toolkit'

export const burgerSlice = createSlice({
    name:'burger',
    initialState:{
        value:false
    },
    reducers:{
        burgerClick: (state)=>{
            state.value = !state.value
        }
    }
})

//Actions that can be dispatched
export const {burgerClick} = burgerSlice.actions

//The reducer that will be part of the store.
export default burgerSlice.reducer