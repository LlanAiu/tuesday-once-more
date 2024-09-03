import EditForm from '@/app/components/topics/edit-form';
import { fetchTopicById } from '@/app/lib/data';
import { notFound } from 'next/navigation';


export default async function Page({params}: {params: {id: number}}){
    const tag = await fetchTopicById(params.id);
    
    if(tag === undefined){
       notFound();
    }

    return (
        <EditForm tag={tag}/>
    );
}