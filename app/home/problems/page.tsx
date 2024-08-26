import FilterHead from '@/app/components/problems/filter-head';
import { fetchProblemPages } from '@/app/lib/data';
import { ProblemData } from '@/app/lib/data-structure';

export default async function Page(){

    let totalPages = await fetchProblemPages('');
    let currentPage = 1;
    
    return (
        <div className='m-2'>
            <title className='text-xl'><b>All Problems</b></title>
            <div>
                <FilterHead />
            </div>
            <div>
                {/* Problem List */}
            </div>
            <div>
                {/* Pagination */}
            </div>
        </div>        
    );
}