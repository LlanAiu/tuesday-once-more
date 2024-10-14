import { TopicData } from '@/app/lib/data-structure';
import Link from 'next/link';

export default function TopicCard({topic} : {topic: TopicData}){


    return (
        <div className='p-1.5 min-h-14 border border-gray-600 h-max rounded-md'>
            <div className='inline-block'>
                <p className='text-gray-700'><b>{topic.name}</b></p>
                <p className='text-sm'>{topic.description}</p>
            </div>
            <div className='float-right h-max w-14 text-center py-1.5 rounded-md bg-slate-50 hover:bg-slate-300'>
                <Link href={`/home/topics?query=${topic.name}&page=1`}>
                    <p>Go to</p>
                </Link>
            </div>
        </div>
    );
}