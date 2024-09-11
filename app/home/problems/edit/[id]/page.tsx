import EditForm from '@/app/components/problems/edit-form';
import { fetchAllTopics, fetchProblemById, fetchTopicsByProblem } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({params} : {params: {id: number}}){
    
    const problem = await fetchProblemById(params.id);
    const tags = await fetchAllTopics();
    const selected = await fetchTopicsByProblem(params.id);

    if(!problem){
        notFound();
    }
    
    return (
        <EditForm problem={problem} tags={tags} selected={selected}/>
    );
}