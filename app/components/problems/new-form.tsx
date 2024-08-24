'use client'

import { addProblem, State } from "@/app/lib/actions";
import { useActionState, useState } from "react";

export default function Form(){
    const initialState: State = {errors: {}, message: null};
    const [state, formAction] = useActionState(addProblem, initialState);
    
    const [sliderValue, setSliderValue] = useState(5);

    function handleSliderValue(s: string){
        setSliderValue(Number(s));
    }
    
    return (
        <div className='h-auto mr-4'>
            <h1 className='text-xl pl-2.5 pt-3.5'><b>Add New Problem</b></h1>
            <form action={formAction}>
                <div className='flex-col space-y-2 m-4'>
                    <label className ='flex-auto text-lg text-gray-600' htmlFor="title">
                        <b>Problem Title</b>
                    </label>
                    <input
                        id="title"
                        className='flex-auto w-full text-wrap bg-slate-50 px-1.5 py-1 rounded-md'
                        name="title"
                        type="text"
                        required
                        placeholder="Title Here"
                    />
                </div>
                <div className='flex-col space-y-2 m-4'>
                    <label className ='flex-auto text-lg text-gray-600' htmlFor="description">
                        <b>Description</b>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className='flex-1 w-full bg-slate-50 px-1.5 py-1 rounded-md'
                        required
                        rows={2}
                        placeholder="Description Here"
                    />
                </div>
                <div className='flex-col space-y-2 m-4'>
                    <label className ='flex-auto text-lg text-gray-600' htmlFor="example">
                        <b>Example</b>
                    </label>
                    <textarea
                        id="example"
                        name="example"
                        className='flex-1 w-full bg-slate-50 px-1.5 py-1 rounded-md'
                        placeholder="Example (optional)"
                        rows={1}
                    />
                </div>
                <div className='flex-col space-y-2 m-4'>
                    <label className ='flex-1 text-lg text-gray-600' htmlFor="difficulty">
                        <b>Difficulty</b>
                    </label>
                    <div className='space-x-5 flex-1 flex w-full'>
                        <input
                            id="difficulty"
                            name="difficulty"
                            className='flex-1 w-4/5'
                            type='range'
                            min={1}
                            max={10}
                            value={sliderValue}
                            onChange={(e) => handleSliderValue(e.target.value)}
                        />
                        <p className='flex-none w-2 pr-5'><b>{sliderValue}</b></p>
                    </div>
                </div>
                <div className='flex-col space-y-2 m-4'>
                    <label className ='flex-1 text-lg text-gray-600' htmlFor="solution">
                        <b>Solution</b>
                    </label>
                    <textarea
                        id="solution"
                        name="solution"
                        className='flex-1 w-full px-1.5 py-1 rounded-md bg-slate-50'
                        required
                        rows={2}
                        placeholder="Solution here"
                    />
                </div>
                <div className='flex-col space-y-4 m-4'>
                    <label className ='flex-1 text-lg text-gray-600' htmlFor="notes">
                        <b>Notes</b>
                    </label>
                    <textarea
                        id="notes"
                        name="notes"
                        className='flex-1 w-full px-1.5 py-1 rounded-md bg-slate-50'
                        rows={1}
                        placeholder="Extra notes"
                    />
                </div>
                <div>
                    <label htmlFor='tags'>Add Topic Tags</label>
                </div>
                <button className='float-right w-15 text-center p-2 mt-2 mr-4 rounded-md bg-slate-50 hover:bg-slate-300' type='submit'>Add</button>
            </form>
        </div>
    );
}