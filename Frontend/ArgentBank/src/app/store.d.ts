import { ThunkAction, Action } from "@reduxjs/toolkit";
export declare const store: import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<{
    auth: {
        user: import("../features/counter/authSlice").User | null;
        status: string;
        error: string | null;
        token: string | null;
        balances: {
            [accountId: string]: import("../features/counter/authSlice").Transaction[];
        };
    };
}, import("redux").AnyAction, [import("@reduxjs/toolkit").ThunkMiddleware<{
    auth: {
        user: import("../features/counter/authSlice").User | null;
        status: string;
        error: string | null;
        token: string | null;
        balances: {
            [accountId: string]: import("../features/counter/authSlice").Transaction[];
        };
    };
}, import("redux").AnyAction>]>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
