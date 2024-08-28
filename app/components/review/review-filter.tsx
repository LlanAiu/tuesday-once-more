'use client'

import { TopicData } from '@/app/lib/data-structure';
import { useState } from 'react';
import Search from '../problems/search';


export default function ReviewFilter({tags}: {tags: TopicData[]}){
    
    const[difficulty, setDifficulty] = useState(5);

    function handleChange(s: string){
        setDifficulty(Number(s));
    }
    
    return (
        <div className='mx-4 pt-4 space-y-2'>
            <h1 className='block text-xl mb-2'><b>Review</b></h1>
            <form className='block'>
                <div className='m-2'>
                    <label className='block mb-4 text-slate-700' htmlFor='review-topics'><u>Select Topics</u></label>
                    <Search tags={tags}/>
                </div>
                <div className='m-2 mb-6'>
                    <label className='block text-slate-700' htmlFor='review-difficulty'><u>Select Difficulty</u></label>
                    <div className='block my-3 w-full'>
                        <input 
                            name='review-difficulty'
                            id='review-difficulty'
                            className='inline-block w-2/3'
                            type='range'
                            min='1'
                            max='10'
                            step='1'
                            value={difficulty}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                        <p className='inline-block ml-4 w-6'>{difficulty}</p>
                    </div>
                </div>

                <input type='submit' className='flex-auto p-2 w-12 rounded-md bg-slate-100 hover:bg-slate-300' value={'Go'}/>
            </form>
           
        </div>
    );
}