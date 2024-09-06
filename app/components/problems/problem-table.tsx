import { fetchProblemByPage, fetchTopicsByProblem } from '@/app/lib/data';
import { TopicData } from '@/app/lib/data-structure';
import ProblemCard from './problem-card';

export default async function ProblemTable({query, page} : {query: string, page: number}){

    const problems = await fetchProblemByPage(query, page);
    const problemTags = new Map<number, TopicData[]>();

    for(let problem of problems){
        const tags = await fetchTopicsByProblem(problem.id);
        problemTags.set(problem.id, tags);
    }
    
    return (
        <div className='space-y-2'>
            {problems.map((problem) => {
                return <ProblemCard key={problem.id} problem={problem} topics={problemTags.get(problem.id) || []}/>
            })}
        </div>
    );
}