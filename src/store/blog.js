import { createSlice, configureStore } from '@reduxjs/toolkit';

const drawerOpenSlice = createSlice({
  name: 'draweropen',
  initialState: window.matchMedia('(min-width: 1200px)').matches,
  reducers: {
    setOpen: (state) => {
      return true;
    },
    setClose: (state) => {
      return false;
    },
  },
});

export const { setOpen, setClose } = drawerOpenSlice.actions;

export default configureStore({
  reducer: {
    drawerOpen: drawerOpenSlice.reducer,
  },
});
