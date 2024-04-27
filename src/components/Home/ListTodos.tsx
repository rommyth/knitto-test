'use client';

import { useGetTodosQuery } from '@/reducers/services/todosService';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

export default function ListTodos() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [page, setPage] = useState<number>(1);
    const [start, setStart] = useState<number>(Number(searchParams.get('_start')) ?? 0);
    const [limit, setLimit] = useState<number>(Number(searchParams.get('_limit')) ?? 10);

    const { data: todos } = useGetTodosQuery(searchParams.toString());

    const prev = () => {
        setPage(page - 1);
        setStart(start - limit);
        const params = new URLSearchParams(searchParams.toString());
        params.set('_start', `${start - limit}`);
        params.set('_limit', `${limit}`);

        router.push(pathname + '?' + params.toString());
    };

    const next = () => {
        setPage(page + 1);
        setStart(start + limit);
        const params = new URLSearchParams(searchParams.toString());
        params.set('_start', `${start + limit}`);
        params.set('_limit', `${limit}`);

        router.push(pathname + '?' + params.toString());
    };

    if (!todos) return <div>Loading...</div>;

    return (
        <div className='flex flex-col'>
            <div className='flex-1 max-h-[85vh] overflow-y-scroll '>
                {todos?.map((todo, index) => (
                    <div key={index} className='flex flex-row items-center mb-3 bg-neutral-800 w-full max-w-md rounded-md overflow-hidden'>
                        <div className='bg-purple-600 flex-shrink-0 w-8 flex items-center justify-center h-full  '>{todo.id}</div>
                        <div className='p-4 flex-1'>
                            <div className='flex flex-row items-center justify-between'>
                                <div className='text-base text-bold'>{todo.title}</div>
                                <div className={`${todo.completed ? 'bg-green-500' : 'bg-red-500'} capitalize px-3 py-[2px] rounded text-sm shadow-md`}>{JSON.stringify(todo.completed)}</div>
                            </div>
                            <div className='text-neutral-400 text-xs'>by user {todo.userId}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex flex-row items-center justify-between'>
                <div className='mt-2 flex flex-row items-center justify-center gap-3'>
                    <button className='bg-neutral-700 px-2 rounded-l' onClick={() => prev()}>
                        {'<'}
                    </button>
                    <div>{page}</div>
                    <button className='bg-neutral-700 px-2 rounded-r' onClick={() => next()}>
                        {'>'}
                    </button>
                </div>
                <div className='text-xs text-neutral-500'>Last Render: {new Date().toLocaleString()}</div>
            </div>
        </div>
    );
}
