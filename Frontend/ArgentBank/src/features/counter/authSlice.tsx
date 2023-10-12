import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface User {
  status: number;
  message: string;
  body: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    userName: string;
  };
}

const initialState: { user: User | null, status: string, error: string | null, token: string | null } = {
  user: null,
  status: 'idle',
  error: null,
  token: localStorage.getItem('token'),
};

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

export const updateUsername = createAsyncThunk(
  'auth/updateUsername',
  async (newUsername: string, { rejectWithValue }) => {
    const storedToken = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${storedToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName: newUsername })
      });
      const data = await res.json();
      if (data.status === 200) {
        return newUsername;
      } else {
        return rejectWithValue("Une erreur s'est produite lors de la mise à jour.");
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
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
    },
    setToken: (state, action) => {
      state.token = action.payload;
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
      builder.addCase(updateUsername.fulfilled, (state, action) => {
    if (state.user) {
      state.user.body.userName = action.payload;
    }
  });
  },
});

export const { logout, setUser, setToken} = authSlice.actions;
export default authSlice.reducer;