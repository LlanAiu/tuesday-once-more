'use server'

import z from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createProblem, fetchProblemByFilterData } from './data';

const schema = z.object({
    title: z.string(),
    id: z.number(),
    description: z.string(),
    example: z.string().optional(),
    difficulty: z.coerce.number(),
    solution: z.string(),
    notes: z.string().optional(),
    lastSeen: z.date(),
    successRate: z.number()
});

const Create = schema.omit({id: true, lastSeen: true, successRate: true});

export async function addProblem(state: State, data: FormData) {
    const validated = Create.safeParse({
        title: data.get('title'),
        description: data.get('description'),
        example: data.get('example'),
        difficulty: data.get('difficulty'),
        solution: data.get('solution'),
        notes: data.get('notes')
    });

    if(!validated.success){
        console.log("validation error");
        return {
            errors: validated.error.flatten().fieldErrors,
            message: 'Missing Required Fields'
        };
    }

    try {
        await createProblem(validated.data);
    } catch (error) {
        return {
            message: 'Failed to Create New Problem'
        }
    }
    
    revalidatePath('/home/problems');
    redirect('/home/problems');
}

export type State = {
    errors?: {
        title?: string[],
        description?: string[],
        example?: string[],
        difficulty?: string[],
        solution?: string[],
        notes?: string[]
    },
    message?: string | null
};


const filterSchema = z.object({
    topics: z.array(z.string()).optional(),
    difficulty: z.number().optional()
});

export async function selectProblem(state: FilterState, data: FormData) {
    const validated = filterSchema.safeParse({
        topics: data.get('topics'),
        difficulty: data.get('difficulty')
    });

    if(!validated.success){
        return {
            errors: validated.error.flatten().fieldErrors,
            message: 'Invalid Filter Criteria'
        };
    }

    const problem = await fetchProblemByFilterData(validated.data);
}

export type FilterState = {
    errors?: {
        topics?: string[],
        difficulty?: string[]
    },
    message?: string | null
};