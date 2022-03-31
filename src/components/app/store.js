import { configureStore } from '@reduxjs/toolkit';
import slice from '../Redux/Store';

export default configureStore({
  reducer: {
    store: slice,
  },
});