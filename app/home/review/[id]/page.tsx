
import ProblemDisplay from '@/app/components/review/problem-display';
import { fetchProblemById } from '@/app/lib/data';

export default async function Page({ params }: {params: {
    id: string
}}){

    const problem = await fetchProblemById(params.id);
    
    return (
        <ProblemDisplay problem={problem}/>
    );
}