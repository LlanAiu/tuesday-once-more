'use client'

import ProblemDisplay from '@/app/components/review/problemDisplay';
import { fetchProblemById } from '@/app/lib/data';

export default async function Page({ params }: {params: {
    id: string
}}){

    const problem = await fetchProblemById(params.id);
    
    return (
        <ProblemDisplay problem={problem}/>
    );
}