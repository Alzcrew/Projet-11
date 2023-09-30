import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://127.0.0.1:5173/api/login', {  // URL ajustée
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Header ajouté
        },
        body: JSON.stringify({
          email: credentials.username,  // Ajusté pour correspondre à l'API
          password: credentials.password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.body.token);  // Stockage du token
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
    error: null,  // Ajouté
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('token');
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

export const { logout } = authSlice.actions;
export default authSlice.reducer;
