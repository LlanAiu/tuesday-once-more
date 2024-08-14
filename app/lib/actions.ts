'use server'

import z from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const schema = z.object({
    title: z.string(),
    id: z.string(),
    description: z.string(),
    example: z.string().optional(),
    difficulty: z.coerce.number(),
    solution: z.string(),
    notes: z.string().optional(),
    lastSeen: z.date()
});

const Create = schema.omit({id: true, lastSeen: true});

export async function addProblem(state: State, data: FormData) {
    console.log('add problem queued');
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
            message: 'Missing required fields'
        };
    }

    try {
        //upload to db or smthn
        console.log(validated.data);
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