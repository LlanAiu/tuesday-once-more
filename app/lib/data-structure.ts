

export type ProblemData = {
    title: string,
    id: number,
    description: string,
    example?: string,
    difficulty: number,
    solution: string,
    notes?: string,
    lastSeen: Date,
    successRate: number
};

export type InputData = {
    title: string,
    description: string,
    example?: string,
    difficulty: number,
    solution: string,
    notes?: string
}

export type FilterData = {
    topics?: string[],
    difficulty?: number
}