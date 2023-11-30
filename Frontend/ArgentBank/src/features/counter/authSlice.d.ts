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
declare const initialState: {
    user: User | null;
    status: string;
    error: string | null;
    token: string | null;
    balances: Balances;
};
export declare const loginUser: import("@reduxjs/toolkit").AsyncThunk<any, {
    username: string;
    password: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const updateUsername: import("@reduxjs/toolkit").AsyncThunk<string | undefined, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const updateBalance: import("@reduxjs/toolkit").AsyncThunk<{
    [x: string]: Transaction[];
}, Transaction, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const fetchUpdatedTransactions: import("@reduxjs/toolkit").AsyncThunk<any, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const logout: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/logout">, setUser: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "auth/setUser">, setToken: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "auth/setToken">;
declare const _default: import("redux").Reducer<{
    user: User | null;
    status: string;
    error: string | null;
    token: string | null;
    balances: Balances;
}>;
export default _default;
