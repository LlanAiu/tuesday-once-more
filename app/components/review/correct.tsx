'use client'

import { addProblemAttempted } from '@/app/lib/actions';

export default function Correct({text} : {text: string}){
    const setCorrect = addProblemAttempted.bind(null, true);

    return (
        <form action={setCorrect} className='w-max inline-block'>
            <button className='w-16 p-1.5 rounded-md bg-slate-100 hover:bg-green-400'>{text}</button>
        </form>
    );
}