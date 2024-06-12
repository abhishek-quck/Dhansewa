import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const centerApiSlice = createApi({
	reducerPath:'centerApi',
	baseQuery: fetchBaseQuery({ baseUrl:process.env.REACT_APP_BACKEND_URI ,
	  prepareHeaders: ( headers, { getState }) => {   
		headers.set('Accept','application/json' ) 
		headers.set('Content-Type', 'application/json') 
		headers.set('Authorization', `Bearer ${localStorage.getItem('auth-token')}`) 
		return headers
	  }
	}),  
	endpoints: builder => ({
	  getCenters: builder.query({
		query:()=>'/get-center'
	  }),
	  searchCenters:builder.query({
		query:term =>{
			return {
				url:`/get-center?search=${term}`,
				credentials:"include"
			}
		}
	  })
	})	
})

const initialState = {
    loading:true,
    data:[],
	error:''
}

const fetchCenter = createAsyncThunk('centers/fetchCenter', ()=> axios.get('/get-center').then(res=> res.data))

const centerSlice = createSlice({
    name:'center',
    initialState,
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(fetchCenter.pending, state => {
            state.loading=true
        })
        builder.addCase(fetchCenter.fulfilled, (state,action)=>{   
            state.loading=false
            state.data = action.payload.data
        })
        builder.addCase(fetchCenter.rejected, (state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
    }
})
 
export default centerSlice.reducer
export const { useGetCentersQuery, useSearchCentersQuery } = centerApiSlice  
export { fetchCenter }