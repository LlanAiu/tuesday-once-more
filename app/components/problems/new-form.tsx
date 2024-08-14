'use client'

import { addProblem, State } from "@/app/lib/actions";
import { ChangeEvent, useActionState, useState } from "react";
import { useFormState } from "react-dom";

export default function Form(){
    const initialState: State = {errors: {}, message: null};
    const [state, formAction] = useActionState(addProblem, initialState);
    // const [state, formAction] = useFormState(addProblem, initialState);
    
    const [sliderValue, setSliderValue] = useState(5);

    function handleSliderValue(s: string){
        setSliderValue(Number(s));
    }
    
    return (
        <form action={formAction}>
            <div className='flex-col'>
                <label className ='flex-auto' htmlFor="title">
                    Problem Title
                </label>
                <input
                    id="title"
                    className='flex-auto w-full'
                    name="title"
                    type="text"
                    required
                    placeholder="title"
                />
            </div>
            <div className='flex-col'>
                <label className ='flex-1' htmlFor="description">
                    Description
                </label>
                <input
                    id="description"
                    name="description"
                    className='flex-1 w-full h-16'
                    type="text"
                    required
                    placeholder="description"
                />
            </div>
            <div className='flex-col'>
                <label className ='flex-1' htmlFor="example">
                    Example
                </label>
                <input
                    id="example"
                    name="example"
                    className='flex-1 w-full h-24'
                    type="text"
                    placeholder="example (optional)"
                />
            </div>
            <div className='flex-col'>
                <label className ='flex-1' htmlFor="difficulty">
                    Difficulty
                </label>
                <div className='space-x-5 flex-1 w-full'>
                    <input
                        id="difficulty"
                        name="difficulty"
                        className='inline-block w-3/4'
                        type='range'
                        min={1}
                        max={10}
                        value={sliderValue}
                        onChange={(e) => handleSliderValue(e.target.value)}
                    />
                    <p className='inline-block w-1/6'>{sliderValue}</p>
                </div>
            </div>
            <div className='flex-col'>
                <label className ='flex-1' htmlFor="solution">
                    Solution
                </label>
                <input
                    id="solution"
                    name="solution"
                    className='flex-1 w-full'
                    type='text'
                    required
                    placeholder="solution"
                />
            </div>
            <div className='flex-col'>
                <label className ='flex-1' htmlFor="notes">
                    Notes
                </label>
                <input
                    id="notes"
                    name="notes"
                    className='flex-1 w-full h-24'
                    type='text'
                    placeholder="extra notes"
                />
            </div>
            <div>
                <button type='submit'>Add</button>
            </div>
        </form>
    );
}