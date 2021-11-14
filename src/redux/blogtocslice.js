import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'activeHeading',
  initialState: '',
  reducers: {
    setActiveHeading: (_, action) => {
      return action;
    },
  },
});

export const { setActiveHeading } = slice.actions;

export default slice.reducer;
