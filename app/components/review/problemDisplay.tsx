'use client'

import { ProblemData } from '@/app/lib/data-structure';
import clsx from 'clsx';
import { useState } from 'react';

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
            <div className='space-y-4 pl-2 mb-2'>
                <h1 className='block'>{problem.title}</h1>
                <p className='block'>{problem.description}</p>
                {problem.example && (<p className='block'>{problem.example}</p>)}
            </div>
            <div className='space-y-2 mb-2'>
                <button className='block p-2 rounded-lg bg-blue-200 hover:bg-blue-400' onClick={handleClickSolution}>Reveal Solution</button>
                {toggleSolution && 
                    (<p className='block text-gray-500'>
                        {problem.solution}
                    </p>)
                }
            </div>
            {problem.notes && (
                <div className='space-y-2 mb-2'>
                    <button className='block p-2 rounded-lg bg-blue-200 hover:bg-blue-400' onClick={handleClickNotes}>Expand Notes</button>
                    {toggleNotes && <p className='block text-gray-500'>{problem.notes}</p>}
                </div>
            )}
        </>
    );
}