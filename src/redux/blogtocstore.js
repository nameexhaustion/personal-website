import { configureStore } from '@reduxjs/toolkit';
import activeHeadingReducer from './blogtocslice';

export default configureStore({
  reducer: {
    activeHeading: activeHeadingReducer,
  },
});
