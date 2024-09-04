import Search from '@/app/components/search';
import TopicTable from '@/app/components/topics/topic-table';
import { fetchAllTopics, fetchTopics } from '@/app/lib/data';
import Link from 'next/link';

export default async function Page({ searchParams } : {
    searchParams?: {
        query?: string,
        page?: number
    }
}) {

    const tags = await fetchTopics(searchParams?.query || '', searchParams?.page || 1);
    const currentPage = searchParams?.page || 1;

    return (
        <div className='mx-4 py-2 space-y-2'>
            <h1 className='block text-xl'><b>All Topics</b></h1>
            <div className='flex flex-row space-x-3'>
                <div className='flex-1 space-y-2'>
                    <label className='text-gray-700 text-lg'><u>Search</u></label>
                    <Search objectName='Topics'/>
                </div>
                <div className='flex-none self-end mb-1.5 w-max'>
                    <Link href='./topics/create' className='w-24 p-2 rounded-md bg-slate-50 hover:bg-slate-200'> 
                        New Topic
                    </ Link>
                </div>
            </div>
            <div className='block'>
                <TopicTable tags={tags}/>
            </div>
            <div>
                {/* Pagination here... later */}
            </div>
        </div>
    );
}