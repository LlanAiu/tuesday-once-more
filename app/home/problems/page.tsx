
import ProblemTable from '@/app/components/problems/problem-table';
import { fetchProblemPages } from '@/app/lib/data';
import Link from 'next/link';

export default async function Page(){

    let totalPages = await fetchProblemPages('');
    let currentPage = 1;
    
    return (
        <div className='m-2'>
            <title className='text-xl'><b>All Problems</b></title>
            <div>
                <Link href='/problems/create'>
                    <p>Add New Problem</p>
                </Link>
            </div>
            <div>
                <ProblemTable query={''} page={currentPage} />
            </div>
            <div>
                {/* Pagination */}
            </div>
        </div>        
    );
}