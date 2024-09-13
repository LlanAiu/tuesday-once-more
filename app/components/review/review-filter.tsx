'use client'

import { TopicData } from '@/app/lib/data-structure';
import { useActionState, useState } from 'react';
import Search from '../problems/search';
import { FilterState, selectProblem } from '@/app/lib/actions';


export default function ReviewFilter({tags}: {tags: TopicData[]}){
    const initialState: FilterState = {errors: {}, message: ''};
    const[state, formAction] = useActionState(selectProblem, initialState);

    const[minDifficulty, setMinDifficulty] = useState(3);
    const[maxDifficulty, setMaxDifficulty] = useState(7);

    function handleChangeMin(s: string){
        setMinDifficulty(Number(s));
    }

    function handleChangeMax(s: string){
        setMaxDifficulty(Number(s));
    }
    
    return (
        <div className='mx-4 pt-4 space-y-2'>
            <h1 className='block text-xl mb-2'><b>Review</b></h1>
            <form action={formAction} className='block'>
                <div className='m-2'>
                    <label className='block mb-4 text-slate-700' htmlFor='review-topics'><u>Select Topics</u></label>
                    <Search tags={tags}/>
                </div>
                <div className='m-2 mb-6'>
                    <label className='block text-slate-700' htmlFor='difficulty'><u>Select Difficulty</u></label>
                    <div className='block my-3 w-full'>
                        <input 
                            name='min-difficulty'
                            className='inline-block w-2/3'
                            type='range'
                            min='1'
                            max='10'
                            step='1'
                            value={minDifficulty}
                            onChange={(e) => handleChangeMin(e.target.value)}
                        />
                        <span className='ml-4 w-6'><b>{minDifficulty}</b></span>
                    </div>
                    <div className='block my-3 w-full'>
                        <input 
                            name='max-difficulty'
                            className='inline-block w-2/3'
                            type='range'
                            min='1'
                            max='10'
                            step='1'
                            value={maxDifficulty}
                            onChange={(e) => handleChangeMax(e.target.value)}
                        />
                        <span className='ml-4 w-6'><b>{maxDifficulty}</b></span>
                    </div>
                </div>

                <input type='submit' className='flex-auto p-2 w-12 rounded-md bg-slate-100 hover:bg-slate-300' value={'Go'}/>
            </form>
           
        </div>
    );
}