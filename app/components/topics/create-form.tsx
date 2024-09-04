'use client'

import { addTopic, TopicState } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function TopicForm() {
    const initialState: TopicState = {errors: {}, message: null};
    const [state, formAction] = useActionState<TopicState, FormData>(addTopic, initialState);

    return (
        <div>
            <h1 className='text-xl pl-2.5 pt-3.5 text-gray-800 mb-3'><b>Create New Topic</b></h1>
            <form action={formAction}>
                <div className='space-y-4 m-4'>
                    <div className='block space-y-2'>
                        <label htmlFor='name' className='text-lg text-gray-600'><b>Name</b></label>
                        <input 
                            id='name' 
                            name='name'
                            className='w-full px-2 py-1.5 rounded-md' 
                            type='text'
                            placeholder='Name' 
                            required
                        />
                    </div>
                    <div className='block space-y-2'>
                        <label htmlFor='description' className='text-lg text-gray-600'><b>Description</b></label>
                        <textarea 
                            id='description'
                            name='description'
                            className='w-full px-2 py-1.5 rounded-md'
                            rows={2} 
                            placeholder='Description'
                        />
                    </div>
                    <button type='submit' className='p-2 rounded-md bg-slate-50 hover:bg-slate-200'>Create</button>
                </div>
            </form> 
        </div>
    );
}   