import ReviewFilter from '@/app/components/review/review-filter';
import { fetchAllTopics } from '@/app/lib/data';

export default async function Page(){

    const tags = await fetchAllTopics();

    return (
        <ReviewFilter tags={tags}/>
    );
}