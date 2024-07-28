import {
    Bill,
    CheckoutOfflineRequest,
    CheckoutOfflineRespone,
    CreateBillRequest,
} from '../types/bill.type';
import { baseQueryWithReauth } from './baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';

export const billApi = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['bill'],
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        createBill: builder.mutation<Bill, CreateBillRequest>({
            query: (body) => ({
                url: `api/Bill/CreateBill`,
                method: 'POST',
                body,
            }),
        }),
        checkoutOffline: builder.mutation<CheckoutOfflineRespone, CheckoutOfflineRequest>({
            query: (para) => ({
                url: `api/Bill/CheckoutOffline/${para.billId}?cashAmount=${para.cashAmount}`,
                method: 'POST',
            }),
        }),
    }),
    reducerPath: 'billApi',
});

export default billApi;
