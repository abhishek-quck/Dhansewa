import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/auth'  
import collectionReducer from './features/collectionSlice'
import { apiSlice } from './features/api';
import { centerApiSlice } from './features/centerSlice';
import centerReducer from './features/centerSlice';

export const store = configureStore({
    reducer: { 
		[apiSlice.reducerPath]:apiSlice.reducer, // will create a dynamic reducer name accordingly
		auth:authReducer ,
		collections:collectionReducer,
		[centerApiSlice.reducerPath]:centerApiSlice.reducer, // will create a dynamic reducer name accordingly
		center:centerReducer
	}, 
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat([apiSlice.middleware,centerApiSlice.middleware])
})
// setupListeners(store.dispatch) 