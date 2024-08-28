import TopicTable from '@/app/components/topics/topic-table';
import { fetchAllTopics } from '@/app/lib/data';

export default async function Page(){

    const tags = await fetchAllTopics();

    return (
        <>
            <h1>All Topics</h1>
            <div>
                <TopicTable tags={tags}/>
            </div>
            <div>
                {/* Pagination here... later */}
            </div>
        </>
    );
}