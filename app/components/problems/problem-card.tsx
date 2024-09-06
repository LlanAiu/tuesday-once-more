import { ProblemData, TopicData } from '@/app/lib/data-structure';
import DeleteProblem from './delete';
import Link from 'next/link';

export default function ProblemCard({ problem, topics } : { problem: ProblemData, topics: TopicData[] }) {
    
    const date = problem.lastSeen;
    
    return (
        <div key={problem.id} className='flex flex-row border-2 border-gray-600 w-full p-2'>
            <div className='flex-1 space-y-1'>
                <h1><b>{problem.title}</b></h1>
                <p className='text-sm text-gray-700 text-ellipsis'>{problem.description}</p>
                <div className='space-x-6'>
                    <p className='inline-block text-xs'>Difficulty: {problem.difficulty}</p>
                    <p className='inline-block text-xs'>Accuracy: {problem.successRate}</p>
                </div>
                <p className='text-xs'>Topics: {topics.map(t => t.name).join(", ")}</p>
                
            </div>
            <div className='flex-initial content-center w-max space-y-2'>
                <Link href={`/home/problems/edit/${problem.id}`} className='block p-1.5 w-16 text-center rounded-md bg-slate-50 hover:bg-slate-200'>
                    Edit
                </Link>
                <DeleteProblem id={problem.id} />
                <p className='text-xs text-center'>{date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear()}</p>
            </div>
            
        </div>
    );
}