import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.username,
          password: credentials.password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.body.token);
        return data;
      }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
    token: localStorage.getItem('token'),  // <-- Initialisation du token depuis le localStorage
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;  // <-- Réinitialisation du token
      localStorage.removeItem('token');
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;  // <-- Mise à jour du token
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout, setUser } = authSlice.actions;  
export default authSlice.reducer;
