import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/theReducer'  
import collectionReducer from './features/collectionSlice'
import { apiSlice } from './features/api';
import { commonApiSlice } from './features/centerSlice';
import centerReducer from './features/centerSlice';

export const store = configureStore({
    reducer: { 
		[apiSlice.reducerPath]:apiSlice.reducer, // will create a dynamic reducer name accordingly
		auth:authReducer ,
		collections:collectionReducer,
		[commonApiSlice.reducerPath]:commonApiSlice.reducer, // will create a dynamic reducer name accordingly
		center:centerReducer
	}, 
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat([apiSlice.middleware,commonApiSlice.middleware])
})
// setupListeners(store.dispatch) 