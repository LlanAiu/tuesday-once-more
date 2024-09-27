'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({totalPages} : {totalPages: number}){

    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();
    
    const page: number = Number(searchParams.get('page')) || 1;

    function handleChange(page: number){
        if(page < 1 || page > totalPages){
            return;
        }
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        replace(`${pathName}?${params.toString()}`);
    }

    return (
        <div className='w-full mt-1.5 flex justify-center space-x-2'>
            <button
                onClick={() => handleChange(page - 1)} 
                className='px-2 py-1.5 rounded-md bg-slate-50 hover:bg-slate-200'
            >
                Previous
            </button>
            <p className='mt-1.5'>{page} of {totalPages}</p>
            <button
                onClick={() => handleChange(page + 1)} 
                className='px-2 py-1.5 rounded-md bg-slate-50 hover:bg-slate-200'
            >
                Next
            </button>
        </div>
    );
}