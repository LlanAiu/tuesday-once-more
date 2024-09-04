'use client'

import { editTopic, TopicState } from '@/app/lib/actions';
import { TopicData } from '@/app/lib/data-structure';
import { useActionState } from 'react';

export default function EditForm({tag} : {tag: TopicData}){
    const initialState: TopicState = {errors: {}, message: null};
    const [state, formAction] = useActionState(editTopic, initialState);

    return (
        <div className='ml-2.5 mr-4'>
            <h1 className='text-xl text-gray-800 pt-3.5'><b>Edit Topic</b></h1>
            <form action={formAction}>
                <input type='hidden' name='id' value={tag.id} />
                <div className='ml-2'>
                    <div className='space-y-2 mb-3'>
                        <label className='block text-lg text-gray-600'><b>Name</b></label>
                        <input 
                            type='text' 
                            name='name' 
                            className='w-full px-2 py-1.5 rounded-md'
                            defaultValue={tag.name} 
                        />
                    </div>
                    <div className='space-y-2 mb-5'>
                        <label className='block text-lg text-gray-600'><b>Description</b></label>
                        <textarea    
                            name='description'
                            rows={2}
                            className='w-full px-2 py-1.5 rounded-md' 
                            defaultValue={tag.description} 
                        />
                    </div>
                    <button type='submit' className='p-2 float-end rounded-md bg-slate-50 hover:bg-slate-200'>Confirm</button>
                </div>
            </form>
        </div>
    )
}

