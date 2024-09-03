'use client'

import { editTopic, TopicState } from '@/app/lib/actions';
import { TopicData } from '@/app/lib/data-structure';
import { useActionState } from 'react';

export default function EditForm({tag} : {tag: TopicData}){
    const initialState: TopicState = {errors: {}, message: null};
    const [state, formAction] = useActionState(editTopic, initialState);

    return (
        <form action={formAction}>
            <input type='hidden' name='id' value={tag.id} />
            <div>
                <label>Name</label>
                <input type='text' name='name' defaultValue={tag.name} />
            </div>
            <div>
                <label>Description</label>
                <input type='text' name='description' defaultValue={tag.description} />
            </div>
            <button type='submit'>Confirm</button>
        </form>
    )
}

