import { configureStore } from "@reduxjs/toolkit";

import counterslice from './Slices/counter.ts';
import { authApi } from "./Slices/authSlice.ts";

export const store = configureStore({

    reducer:({

        counter:counterslice,
        [authApi.reducerPath] :authApi.reducer
    }), 

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),


})



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch