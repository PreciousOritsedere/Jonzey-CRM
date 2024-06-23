import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import activitiesSlice from './activities/activitiesSlice';
import categoriesSlice from './categories/categoriesSlice';
import contactsSlice from './contacts/contactsSlice';
import dealsSlice from './deals/dealsSlice';
import email_campaignsSlice from './email_campaigns/email_campaignsSlice';
import leadsSlice from './leads/leadsSlice';
import reportsSlice from './reports/reportsSlice';
import tasksSlice from './tasks/tasksSlice';
import tenantsSlice from './tenants/tenantsSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';
import tenantSlice from './tenant/tenantSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    activities: activitiesSlice,
    categories: categoriesSlice,
    contacts: contactsSlice,
    deals: dealsSlice,
    email_campaigns: email_campaignsSlice,
    leads: leadsSlice,
    reports: reportsSlice,
    tasks: tasksSlice,
    tenants: tenantsSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
    tenant: tenantSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
