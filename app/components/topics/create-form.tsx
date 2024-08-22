'use client'

import { addTopic, TopicState } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function TopicForm() {
    const initialState: TopicState = {errors: {}, message: null};
    const [state, formAction] = useActionState<TopicState, FormData>(addTopic, initialState);

    return (
        <div>
            <h1>Create New Topic</h1>
            <form action={formAction}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input 
                        id='name' 
                        name='name' 
                        type='text'
                        placeholder='Name' 
                        required
                    />
                </div>
                <div>
                    <label htmlFor='description'>Description</label>
                    <textarea 
                        id='description'
                        name='description'
                        rows={2} 
                        placeholder='Description'
                    />
                </div>
                <button type='submit'>Create</button>
            </form> 
        </div>
    );
}   