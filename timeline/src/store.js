import {configureStore} from '@reduxjs/toolkit'
import burgerReducer from './slices/burgerSlice'

export default configureStore({
    reducer:{
        burger:burgerReducer
    },
})