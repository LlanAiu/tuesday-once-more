import EditForm from '@/app/components/problems/edit-form';
import { fetchProblemById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({params} : {params: {id: number}}){
    
    const problem = await fetchProblemById(params.id);

    if(!problem){
        notFound();
    }
    
    return (
        <EditForm problem={problem} />
    );
}