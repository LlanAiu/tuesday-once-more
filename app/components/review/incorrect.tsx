'use client'

import { addProblemAttempted } from '@/app/lib/actions';

export default function Incorrect({text} : {text: string}){
    const setIncorrect = addProblemAttempted.bind(null, false);

    return (
        <form action={setIncorrect} className='w-max inline-block'>
            <button className='w-16 p-1.5 rounded-md bg-slate-100 hover:bg-red-400'>{text}</button>
        </form>
    );
}