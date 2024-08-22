
import ProblemDisplay from '@/app/components/review/problem-display';
import { fetchProblemById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: {params: {
    id: number
}}){

    const problem = await fetchProblemById(params.id);

    if(problem === undefined){
        notFound();
    }
    
    return (
        <ProblemDisplay problem={problem}/>
    );
}