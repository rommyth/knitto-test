'use client';

import { store } from '@/reducers/store/store';
import React from 'react';
import { Provider } from 'react-redux';

export default function StoreProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    return <Provider store={store}>{children}</Provider>;
}
