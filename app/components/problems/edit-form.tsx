'use client'

import { editProblem, State } from '@/app/lib/actions';
import { ProblemData, TopicData } from '@/app/lib/data-structure';
import { useActionState, useState } from 'react';
import Search from './search';


export default function EditForm({ problem, tags, selected } : {problem: ProblemData, tags: TopicData[], selected: TopicData[]}) {
    const initialState: State = {errors: {}, message: ''};
    const [state, formAction] = useActionState(editProblem, initialState);
    const initialTags = selected; 

    const [sliderValue, setSliderValue] = useState(problem.difficulty);

    function handleSliderValue(s: string){
        setSliderValue(Number(s));
    }

    return (
        <div className='ml-2.5 mr-5 pt-2.5'>
            <h1 className='text-xl text-gray-800 mb-3'><b>Edit Problem</b></h1>
            <form className='space-y-2' action={formAction}>
                <div className='block'>
                    <label htmlFor='title' className='text-lg text-slate-700'>
                        <b>Title</b>
                    </label>
                    <input 
                        type='text' 
                        name='title'
                        className='w-full p-1.5 rounded-md bg-slate-50' 
                        defaultValue={problem.title} 
                    />
                    <input type='hidden' name='id' value={problem.id} />
                </div>
                <div className='block'> 
                    <label htmlFor='description' className='text-lg text-slate-700'>
                        <b>Description</b>
                    </label>
                    <textarea 
                        name='description' 
                        className='w-full p-1.5 rounded-md bg-slate-50'
                        defaultValue={problem.description} 
                    />
                </div>
                <div className='block'>
                    <label htmlFor='example' className='text-lg text-slate-700'>
                        <b>Example</b>
                    </label>
                    <textarea 
                        name='example'
                        className='w-full p-1.5 rounded-md bg-slate-50' 
                        defaultValue={problem.example}
                        placeholder='Add an example...' 
                    />
                </div>
                <div className='block'>
                    <label htmlFor='difficulty' className='text-lg text-slate-700'>
                        <b>Difficulty</b>
                    </label>
                    <div className='block'>
                        <input 
                            type='range'
                            name='difficulty'
                            className= 'w-5/6'
                            min='1'
                            max='10'
                            value={sliderValue}
                            onChange={(e) => handleSliderValue(e.target.value)}
                        />
                        <span className='ml-4'><b>{sliderValue}</b></span>
                    </div>
                </div>
                <div className='block'>
                    <label htmlFor='solution' className='text-lg text-slate-700'>
                        <b>Solution</b>
                    </label>
                    <textarea 
                        name='solution'
                        className='w-full p-1.5 rounded-md bg-slate-50' 
                        defaultValue={problem.solution}
                    />
                </div>
                <div className='block'>
                    <label htmlFor='notes' className='text-lg text-slate-700'>
                        <b>Notes</b>
                    </label>
                    <textarea 
                        name='notes' 
                        className='w-full p-1.5 rounded-md bg-slate-50'
                        defaultValue={problem.notes} 
                        placeholder='Your notes here...'
                    />
                </div>
                <div className='block'>
                    <label htmlFor='topics' className='text-lg text-slate-700'>
                        <b>Topics</b>
                    </label>
                    <input type='hidden' name='original-topics' value={selected.map(t => t.id).join('/')}/>
                    <Search tags={tags} initialTags={initialTags}/>
                </div>
                <button type='submit' className='p-1.5 rounded-md bg-slate-50 hover:bg-slate-300'>Submit</button>
            </form>
        </div>
    );
}