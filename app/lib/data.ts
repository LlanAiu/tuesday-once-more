import { ProblemData } from './data-structure';


//Filler function, for now
export async function fetchProblemById(id: string): Promise<ProblemData>{
    return {
        title: 'Nothing',
        id: id,
        description: 'to',
        example: 'See',
        difficulty: 5,
        solution: 'Here',
        notes: 'Lol',
        lastSeen: new Date(),
        successRate: 1
    };
}