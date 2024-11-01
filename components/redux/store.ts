// store.ts
import { configureStore } from '@reduxjs/toolkit';
import asteroidReducer from './slices/asteroidSlice';

const store = configureStore({
  reducer: {
    asteroid: asteroidReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
