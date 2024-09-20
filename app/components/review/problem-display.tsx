'use client'

import { ProblemData } from '@/app/lib/data-structure';
import { useState } from 'react';
import Correct from './correct';
import Incorrect from './incorrect';

export default function ProblemDisplay({ problem }: { problem: ProblemData }){
    const [toggleSolution, setToggleSolution] = useState(false);
    const [toggleNotes, setToggleNotes] = useState(false);
    
    function handleClickSolution(){
        setToggleSolution((t) => !t);
    }

    function handleClickNotes(){
        setToggleNotes((t) => !t);
    }

    return (
        <>
            <div className='space-y-4 ml-4 pt-3'>
                <h1 className='block text-xl'><b>{problem.title}</b></h1>
                <p className='block'>{problem.description}</p>
                {problem.example && (
                    <div className='block pb-3'>
                        <h3 className='text-lg text-slate-700'><u>Example:</u></h3>
                        <p>{problem.example}</p>
                    </div>
                )}
            </div>
            <div className='space-y-2 m-4'>
                <button className='block p-2 rounded-lg bg-slate-100 hover:bg-slate-400' onClick={handleClickSolution}>Reveal Solution</button>
                {toggleSolution && (
                    <div className='block h-max'>
                        <p className='text-gray-500 mb-4'>
                            {problem.solution}
                        </p>
                        <div className='text-right text-sm mr-4'>
                            <p className='text-slate-600 mb-2'><b>Did you get this question correct?</b></p>
                            <div className='space-x-3'>
                                <Correct text='Yes' />
                                <Incorrect text='No' />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {problem.notes && (
                <div className='space-y-2 m-4'>
                    <button className='block p-2 rounded-lg bg-slate-100 hover:bg-slate-400' onClick={handleClickNotes}>Expand Notes</button>
                    {toggleNotes && <p className='block text-gray-500'>{problem.notes}</p>}
                </div>
            )}
        </>
    );
}