import Search from '@/app/components/search';
import TopicTable from '@/app/components/topics/topic-table';
import { fetchAllTopics, fetchTopics } from '@/app/lib/data';

export default async function Page({ searchParams } : {
    searchParams?: {
        query?: string,
        page?: number
    }
}) {

    const tags = await fetchTopics(searchParams?.query || '', searchParams?.page || 1);
    const currentPage = searchParams?.page || 1;

    return (
        <div className='ml-4 py-2 space-y-2'>
            <h1 className='block text-xl'><b>All Topics</b></h1>
            <div className='block space-y-2'>
                <label className='text-gray-700 text-lg'><u>Search</u></label>
                <Search objectName='Topics'/>
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