
import ProblemDisplay from '@/app/components/review/problem-display';
import { fetchProblemById, updateProblemDate } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: {params: {
    id: number
}}){

    const problem = await fetchProblemById(params.id);

    if(problem === undefined){
        notFound();
    } else {
        await updateProblemDate(problem.id);
    }
    
    return (
        <ProblemDisplay problem={problem}/>
    );
}