'use server'

import z from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addLinkedTopics, createProblem, createTopic, deleteProblemById, deleteTopicById, editProblembyId, editTopicById, fetchProblemByFilterData, incrementStreak, removeLinkedTopics, updateProblemCount } from './data';

const schema = z.object({
    title: z.string(),
    id: z.coerce.number(),
    description: z.string(),
    example: z.string().optional(),
    difficulty: z.coerce.number(),
    solution: z.string(),
    notes: z.string().optional(),
    lastSeen: z.date(),
    successRate: z.number()
});

const Create = schema.omit({id: true, lastSeen: true, successRate: true});
const Edit = schema.omit({lastSeen: true, successRate: true});

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

export async function editProblem(state: State, data: FormData) {
    const validated = Edit.safeParse({
        id: data.get('id'),
        title: data.get('title'),
        description: data.get('description'),
        example: data.get('example'),
        difficulty: data.get('difficulty'),
        solution: data.get('solution'),
        notes: data.get('notes')
    });

    const originalTopics = (data.get('original-topics') as string).split("/").map(Number);
    const newTopics = (data.get('topics') as string).split("/").map(Number);
    
    const addedTopics = newTopics.filter(topic => !originalTopics.includes(topic));
    const removedTopics = originalTopics.filter(topic => !newTopics.includes(topic));

    if(!validated.success){
        return {
            errors: validated.error.flatten().fieldErrors,
            message: 'Missing Required Fields'
        };
    }

    try {
        await editProblembyId(validated.data.id, validated.data);
        await addLinkedTopics(validated.data, addedTopics);
        await removeLinkedTopics(validated.data.id, removedTopics);
    } catch (err) {
        return {
            message: "Failed to Edit Problem"
        };
    }

    revalidatePath('/home/problems');
    redirect('/home/problems');
}

export async function deleteProblem(id: number) {
    try {
        await deleteProblemById(id);
    } catch (err) {
        return {
            message: "Failed to Delete Problem"
        };
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
    minDifficulty: z.coerce.number().optional(),
    maxDifficulty: z.coerce.number().optional()
});

export async function selectProblem(state: FilterState, data: FormData) {
    const topicString = data.get('topics') as string;
    const topics = (topicString.length > 0) ? topicString.split("/").map(Number) : [];
    console.log(topics);

    const validated = filterSchema.safeParse({
        topics: topics,
        minDifficulty: data.get('min-difficulty'),
        maxDifficulty: data.get('max-difficulty')
    });

    if(!validated.success){
        return {
            errors: validated.error.flatten().fieldErrors,
            message: 'Invalid Filter Criteria'
        };
    }

    const problem = await fetchProblemByFilterData(validated.data);
    await incrementStreak();

    if(!problem){
        redirect('/home/review');
    } else {
        revalidatePath(`/home/review/${problem.id}`);
        redirect(`/home/review/${problem.id}`);
    }
}

export type FilterState = {
    errors?: {
        topics?: string[],
        minDifficulty?: string[],
        maxDifficulty?: string[]
    },
    message?: string | null
};

const topicSchema = z.object({
    name: z.string(),
    id: z.coerce.number(),
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

export async function editTopic(state: TopicState, data: FormData){
    const validated = topicSchema.safeParse({
        name: data.get('name'),
        description: data.get('description'),
        id: data.get('id')
    });

    if(!validated.success){
        return {
            errors: validated.error.flatten().fieldErrors,
            message: 'Invalid Topic Data'
        };
    }

    try {
        await editTopicById(validated.data);
    } catch (err) {
        return {
            message: "Failed to Edit Topic"
        };
    }

    revalidatePath('/home/topics');
    redirect('/home/topics');
}

export async function deleteTopic(id: number) {

    try {
        await deleteTopicById(id);
    } catch (err) {
        return {
            message: "Failed to Delete Topic"
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

export async function addProblemAttempted(correct: boolean){
    await incrementStreak();
    await updateProblemCount(correct);
    redirect('/home');
}