'use client'

import { editProblem, State } from '@/app/lib/actions';
import { ProblemData } from '@/app/lib/data-structure';
import { useActionState } from 'react';


export default function EditForm({ problem } : {problem: ProblemData}) {
    const initialState: State = {errors: {}, message: ''};
    const [state, formAction] = useActionState(editProblem, initialState);
    
    return (
        <form action={formAction}>
            <div>
                <label>Title</label>
                <input type='text' name='title' defaultValue={problem.title} />
            </div>
            <div>
                <label>Description</label>
                <textarea name='description' defaultValue={problem.description} />
            </div>
            <div>
                <label>Example</label>
                <textarea name='example' defaultValue={problem.example} />
            </div>
            <div>
                <label>Difficulty</label>
                <input 
                    type='range'
                    name='difficulty'
                    min='1'
                    max='10'
                    defaultValue={problem.difficulty}
                />
            </div>
            <div>
                <label>Solution</label>
                <textarea name='solution' defaultValue={problem.solution} />
            </div>
            <div>
                <label>Notes</label>
                <textarea name='notes' defaultValue={problem.notes} />
            </div>
            <button type='submit'>Submit</button>
        </form>
    );
}