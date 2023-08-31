import { combineReducers } from 'redux';
import authReducer from './slices/authSlice'; // Your auth slice reducer
import themeReducer from './slices/themeSlice'; // Your theme slice reducer

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
});

export default rootReducer;
