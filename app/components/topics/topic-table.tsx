import { deleteTopic } from '@/app/lib/actions';
import { TopicData } from '@/app/lib/data-structure';
import Link from 'next/link';
import { DeleteTopic } from './delete';

export default function TopicTable({tags} : {tags: TopicData[]}){
    
    return (
        <div>
            {tags.map((tag) => {
                return (
                    <div 
                        key={tag.id}
                        className='flex p-2 w-full h-max my-2 border-2 border-gray-500'
                    >
                        <div className='flex-auto space-y-2'>
                            <p className='block'><b>{tag.name}</b></p>
                            <p className='block text-sm text-gray-700 overflow-ellipsis'>{tag.description}</p>
                        </div>
                        <div className='flex-initial space-y-2 w-12 mr-5'>
                            <Link href={`/home/topics/edit/${tag.id}`} className='block p-1 w-12.5 rounded-md bg-slate-100 hover:bg-slate-300 text-center'>
                                Edit
                            </Link>
                            <DeleteTopic tag={tag} />
                        </div>
                    </div>
                );
            })}
        </div>
    );

}