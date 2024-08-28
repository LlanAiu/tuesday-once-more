'use server'

import z from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addLinkedTopics, createProblem, createTopic, fetchProblemByFilterData } from './data';
import { ProblemData, TopicData } from './data-structure';

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

    const topicsIDs = (data.get('topics') as string).split("/").map(Number);

    if(!validated.success){
        console.log("validation error");
        return {
            errors: validated.error.flatten().fieldErrors,
            message: 'Missing Required Fields'
        };
    }

    try {
        await createProblem(validated.data);
        await addLinkedTopics(validated.data, topicsIDs);
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
    topics: z.array(z.number()).optional(),
    difficulty: z.number().optional()
});

export async function selectProblem(state: FilterState, data: FormData) {
    const topics = (data.get('topics') as string).split("/").map(Number);   

    const validated = filterSchema.safeParse({
        topics: topics,
        difficulty: data.get('difficulty')
    });

    if(!validated.success){
        return {
            errors: validated.error.flatten().fieldErrors,
            message: 'Invalid Filter Criteria'
        };
    }

    const problem = await fetchProblemByFilterData(validated.data);

    if(!problem){
        redirect('/home/problems');
    }
    revalidatePath(`/home/problems/${problem.id}`);
    redirect(`/home/problems/${problem.id}`);
}

export type FilterState = {
    errors?: {
        topics?: number[],
        difficulty?: string[]
    },
    message?: string | null
};

const topicSchema = z.object({
    name: z.string(),
    id: z.number(),
    description: z.string().optional()
});

const CreateTopic = topicSchema.omit({id: true});

export async function addTopic(state: TopicState, data: FormData) {
    const validated = CreateTopic.safeParse({
        name: data.get('name'),
        description: data.get('description')
    });

    if(!validated.success){
        return {
            errors: validated.error.flatten().fieldErrors,
            message: 'Invalid Topic Data'
        };
    }

    try {
        await createTopic(validated.data);
    } catch (err) {
        return {
            message: "Failed to Add Topic To Database"
        };
    }
    
    revalidatePath('/home/topics');
    redirect('/home/topics');
}

export type TopicState = {
    errors?: {
        name?: string[],
        description?: string[]
    },
    message?: string | null
};