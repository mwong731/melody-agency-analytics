import { configureStore } from '@reduxjs/toolkit';
import { imagesSlice } from './imagesSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    images: imagesSlice.reducer
  }
})

export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
export const useAppDispatch:()=>typeof store.dispatch = useDispatch;