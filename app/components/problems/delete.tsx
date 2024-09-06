'use client'

import { deleteProblem } from '@/app/lib/actions';

export default function DeleteProblem({id} : {id: number}){
    const deleteAction = deleteProblem.bind(null, id);

    function confirmDelete() {
        if(confirm('Are you sure you want to delete this problem?')){
            deleteAction();
        }
    }

    return (
        <form action={confirmDelete}>
            <button className='block w-16 p-1.5 rounded-md bg-slate-100 hover:bg-red-400'>Delete</button>
        </form>
    );
}