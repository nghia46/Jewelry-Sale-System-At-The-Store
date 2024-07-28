
import { PaggingRequest, PaggingRespone } from '~/types/base.type';
import { Jewelry } from '../types/jewelry.type';
import { JewelryType } from '../types/user.type';
import { baseQueryWithReauth } from './baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';
import { GetUserResponse, SignInRequest, SignInRespone } from '~/types/auth.type';

export const authApi = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['auth'],
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        signIn: builder.mutation<SignInRespone, SignInRequest>({
            query: (body) => ({
                url: `api/User/CustomerLogin`,
                method: 'POST',
                body,
                
            }),
            extraOptions:{
                hasHeader: false
            }
        }),
        getUserById:builder.query<GetUserResponse, string>({
            query: (id) => ({
                url: `api/Customer/GetCustomerById/${id}`,
                method: 'GET',
               
            }),
        }),
        
    }),
    reducerPath: 'authApi',
});

export default authApi;
