import { TopicData } from '@/app/lib/data-structure';
import Link from 'next/link';

export default function TopicCard({topic} : {topic: TopicData}){


    return (
        <div className='border-2 border-gray-600'>
            <p>{topic.name}</p>
            <p>{topic.description}</p>
            <Link href={`/home/topics?query=${topic.name}&page=1`}>
                <p>Go to</p>
            </Link>
        </div>
    );
}