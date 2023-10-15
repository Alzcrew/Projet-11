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

export type AuthState = typeof initialState;

export interface Transaction {
  accountId: string;
  date: string;
  description: string;
  amount: number;
  balance: string;
  type: string;
  category: string;
  note: string;
}

type Balances = {
  [accountId: string]: Transaction[];
};

const initialState = {
  user: null as User | null,
  status: 'idle',
  error: null as string | null,
  token: localStorage.getItem('token'),
  balances: {} as Balances
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
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
  }
);

export const updateUsername = createAsyncThunk(
  'auth/updateUsername',
  async (newUsername: string, { rejectWithValue }) => {
    const storedToken = localStorage.getItem('token');
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
    }
  }
);

export const updateBalance = createAsyncThunk(
  'auth/updateBalance',
  async (newTransaction: Transaction, { getState }) => {
    const state = getState() as { auth: AuthState };
    const currentTransactions = state.auth.balances[newTransaction.accountId] || [];
    return {
      ...state.auth.balances,
      [newTransaction.accountId]: [...currentTransactions, newTransaction]
    };
  }
);

export const fetchUpdatedTransactions = createAsyncThunk(
  'auth/fetchUpdatedTransactions',
  async (accountId: string) => {
    const storedToken = localStorage.getItem('token');
    const res = await fetch(`http://localhost:3001/api/v1/user/accounts/${accountId}/transactions`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${storedToken}`,
      },
    });
    const data = await res.json();
    return data.body;
  }
);

const authSlice = createSlice({
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
      })
      .addCase(updateUsername.fulfilled, (state, action) => {
        if (state.user) {
          state.user.body.userName = action.payload!;
        }
      })
      .addCase(updateBalance.fulfilled, (state, action) => {
        state.balances = action.payload;
      })
      .addCase(fetchUpdatedTransactions.fulfilled, (state, action) => {
        const { transactions, accountId } = action.payload;
        state.balances[accountId] = transactions;
      });
  },
});

export const { logout, setUser, setToken } = authSlice.actions;
export default authSlice.reducer;
