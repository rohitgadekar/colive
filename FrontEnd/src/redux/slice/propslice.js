import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//action
export const fetchProperties = createAsyncThunk('fetchProperties', async () => {
    const response = await fetch('https://api.jsonbin.io/v3/b/64854f43b89b1e2299ad1fa1')
    return response.json()
})

const property = createSlice({
    name:'prop',
    initialState: {
        isLoading:true,
        data:null
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchProperties.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(fetchProperties.fulfilled, (state,action)=>{
            state.isLoading = false
            state.data = action.payload
        })
    }
})

export default property.reducer