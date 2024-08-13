'use client'

import { addProblem, State } from "@/app/lib/actions";
import { useActionState } from "react";

export default function Form(){
    const initialState: State = {errors: {}, message: null};
    const [state, formAction] = useActionState(addProblem, initialState);
    
    
    return (
        <form action={formAction}>
            <div>
                <label htmlFor="title">
                    Problem Title
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    placeholder="title"
                />
            </div>
            
        </form>
    );
}