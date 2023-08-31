import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    primaryColor: '#f0eeee',
    backgroundColor: '#f0eeee',
  },
  reducers: {
    setThemeColors: (state, action) => {
      state.primaryColor = action.payload.primaryColor;
      state.backgroundColor = action.payload.backgroundColor;
    },
  },
});

export const { setThemeColors } = themeSlice.actions;
export default themeSlice.reducer;
