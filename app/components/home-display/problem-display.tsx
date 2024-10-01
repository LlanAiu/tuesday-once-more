import { ProblemData } from '@/app/lib/data-structure';
import Link from 'next/link';

export default function ProblemCard({problem} : {problem: ProblemData}){


    return (
        <div className='border border-gray-600'>
            <p>{problem.title}</p>
            <p>{problem.description}</p>
            <Link href={`/home/problems?query=${problem.title}&page=1`}>
                <p>Go to</p>
            </Link>
        </div>
    );
}