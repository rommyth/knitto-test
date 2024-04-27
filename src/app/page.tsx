import Image from 'next/image';
import axios from 'axios';

import { Suspense, cache } from 'react';
import FormTodos from '@/components/Home/FormTodos';
import { useGetTodosQuery } from '@/reducers/services/todosService';
import ListTodos from '@/components/Home/ListTodos';
export interface ITodos {
    userId: number;
    id?: number;
    title: string;
    completed: boolean;
}

export default function Home() {
    return (
        <main>
            <div className='ml-4'>
                <h1>Rommy Tauik Hidayat</h1>
                <div className='text-xs text-neutral-500'>Last Render: {new Date().toLocaleString()}</div>
            </div>

            <div className='flex flex-col lg:flex-row'>
                <div className='flex-1'>
                    <FormTodos />
                </div>

                <div className='flex-1 flex flex-col items-center justify-center gap-2'>
                    <Suspense>
                        <ListTodos />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}
