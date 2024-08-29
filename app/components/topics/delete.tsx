'use client'

import { deleteTopic } from '@/app/lib/actions';
import { TopicData } from '@/app/lib/data-structure';

export function DeleteTopic({ tag } : {tag: TopicData}){

    const deleteAction = deleteTopic.bind(null, tag.id);

    function confirmDelete() {
        if(confirm('Deletion of this topic will automatically remove the tag from all associated problems, are you sure you want to proceed?')){
            deleteAction();
        }
    }

    return (
        <form action={confirmDelete}>
            <button className='block w-16 p-1 rounded-md bg-slate-100 hover:bg-red-400'>Delete</button>
        </form>
    );
}