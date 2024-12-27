import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
const head = axios.defaults.headers.common

export const apiSlice = createApi({
  reducerPath:'api',
  baseQuery: fetchBaseQuery({ baseUrl:'https://demoapi.dhanseva.co.in/public/api' ,
    prepareHeaders: ( headers, { getState }) => { 
      for(let key in head)
      {
        headers.set(key, head[key]) 
      }
      return headers
    }
  }),  
  endpoints: builder => ({
    getCollections: builder.query({
      query:()=>'/collections'
    }),
    getMonthlyIncome: builder.query({
      query:()=>'/collections/monthly-income'
    })
  })	
})
 
export const { useGetCollectionsQuery, useGetMonthlyIncomeQuery } = apiSlice 