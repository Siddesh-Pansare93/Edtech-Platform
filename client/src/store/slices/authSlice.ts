import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/services/types/user.types';
import { AuthState } from '../types';

const initialState: AuthState = {
  userData: null,
  status: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
