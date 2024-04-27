'use client';

import { useAddTodosMutation } from '@/reducers/services/todosService';
import React, { ButtonHTMLAttributes, useState } from 'react';

interface IFormData {
    userId: number | string;
    title: string;
    completed: boolean;
}

export default function FormTodos() {
    const [showToast, setShowToast] = useState(false);
    const [formData, setFormData] = useState<IFormData>({
        userId: '',
        title: '',
        completed: false,
    });

    const [addTodos, { isSuccess, data, isError, isLoading }] = useAddTodosMutation();

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setShowToast(false);

        await addTodos(formData);
        setFormData({
            userId: '',
            title: '',
            completed: false,
        });

        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 2000);
    };

    return (
        <>
            <div className='p-4 w-full'>
                <div className='border-l border-purple-500 p-4'>
                    <h3 className='text-2xl'>Add Todo</h3>
                </div>
                <form>
                    <div className={`bg-neutral-800 p-4 mt-4 rounded-lg border transition delay-50 ${showToast && isSuccess ? ' border-green-300 ' : 'border-transparent'}`}>
                        <div className='mb-4'>
                            <label>User ID</label>
                            <input type='number' value={formData.userId} onChange={(e) => setFormData((prev) => ({ ...prev, userId: e.target.value }))} className='block bg-neutral-900 border border-neutral-700 p-2 rounded-lg w-full' />
                        </div>
                        <div className='mb-4'>
                            <label>Title</label>
                            <input value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} className='block bg-neutral-900 border border-neutral-700 p-2 rounded-lg w-full' />
                        </div>
                        <label className='inline-flex items-center cursor-pointer mb-3'>
                            <span>Is Complete</span>
                            <input type='checkbox' checked={formData.completed} onChange={(e) => setFormData((prev) => ({ ...prev, completed: e.target.checked }))} className='sr-only peer' />

                            <div className="relative ml-4 w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                        <div className='mt-4'>
                            <button onClick={(event) => handleSubmit(event)} className='w-full bg-purple-600 py-2 rounded-lg'>
                                {isLoading ? 'Submiting...' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </form>
                <div className={`${data ? 'visible' : 'invisible'} mt-5 w-full`}>
                    <div className='flex flex-row items-center mb-3 bg-neutral-800 w-full rounded-md overflow-hidden'>
                        <div className='bg-purple-600 flex-shrink-0 w-8 flex items-center justify-center h-full  '>{data?.id}</div>
                        <div className='p-4 flex-1'>
                            <div className='flex flex-row items-center justify-between'>
                                <div className='text-base text-bold'>{data?.title}</div>
                                <div className={`${data?.completed ? 'bg-green-500' : 'bg-red-500'} capitalize px-3 py-[2px] rounded text-sm shadow-md`}>{JSON.stringify(data?.completed)}</div>
                            </div>
                            <div className='text-neutral-400 text-xs'>by user {data?.userId}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
