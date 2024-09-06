'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar({objectName} : {objectName: string}){
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    
    const handleSearch = useDebouncedCallback((search: string ) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if(search){
            params.set('query', search);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 250);

    return (
        <div>
            <input
                type="text"
                className='w-full p-2 rounded-md h-full'
                onChange={(e) => {handleSearch(e.target.value)}}
                placeholder={`Search ${objectName}...`}
                defaultValue={searchParams.get('query')?.toString()}
            />
        </div>
    );
}