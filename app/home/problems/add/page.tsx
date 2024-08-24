import Form from "@/app/components/problems/new-form";
import { fetchAllTopics } from '@/app/lib/data';

export default async function Page(){
    
    const tags = await fetchAllTopics();

    return (
        <Form tags={tags}/>
    );
}