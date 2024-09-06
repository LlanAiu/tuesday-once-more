
import ProblemTable from '@/app/components/problems/problem-table';
import Search from '@/app/components/search';
import { fetchProblemPages } from '@/app/lib/data';
import Link from 'next/link';

export default async function Page({ searchParams } : { 
    searchParams?: { 
        query?: string, 
        page?: number 
    } 
}) {

    let totalPages = await fetchProblemPages(searchParams?.query || '');
    let currentPage = searchParams?.page || 1;
    
    return (
        <div className='mx-2.5 pt-2.5 mr-6'>
            <h1 className='text-xl text-gray-800'><b>All Problems</b></h1>
            <div className='mt-2 space-y-2'>
                <label>Search Problems</label>
                <div className='flex flex-row space-x-2 pb-4'>
                    <div className='flex-1'>
                        <Search objectName='Problems' />
                    </div>
                    <Link href='./problems/add' className='flex-initial px-1.5 py-1.5 h-full rounded-md bg-slate-50 hover:bg-slate-200'>
                        <p>Add Problem</p>
                    </Link>
                </div>

            </div>
            <div>
                <ProblemTable query={searchParams?.query || ''} page={currentPage} />
            </div>
            <div>
                {/* Pagination */}
            </div>
        </div>        
    );
}