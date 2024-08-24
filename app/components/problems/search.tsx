import { useDebouncedCallback } from 'use-debounce';

export default function Search({ name } : { name: string }) {
    
    let queryName: string;

    const handleSearch = useDebouncedCallback((search: string) => {
        queryName = search;
        
    });

    return (
        <div>
            <input
                className='flex-auto w-full text-wrap bg-slate-50 px-1.5 py-1 rounded-md'
                name="search"
                placeholder={"Search" + name + "s"}
                onChange={(e) => handleSearch(e.target.value)}
            />

        </div>
    );
}