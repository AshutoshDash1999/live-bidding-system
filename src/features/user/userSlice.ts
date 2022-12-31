import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  userName: string;
  userEmail: string;
  userRole: string;
}

const initialState: UserState = {
  userName: '',
  userEmail: '',
  userRole: '',
};

export const userInfoSlice = createSlice({
  name: 'currentUserStore',
  initialState,
  reducers: {
    updateUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    updateUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
    updateUserRole: (state, action: PayloadAction<string>) => {
      state.userRole = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUserName, updateUserEmail, updateUserRole } =
  userInfoSlice.actions;

export default userInfoSlice.reducer;
