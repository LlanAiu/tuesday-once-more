import { TopicData } from '@/app/lib/data-structure';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';



export default function Search({tags} : {tags: TopicData[] | undefined}) {
    const originalTopics = tags;
    const [topics, setTopics] = useState(tags);

    const handleSearch = useDebouncedCallback((search: string) => {
        console.log(search);
        if(search !== ""){
            const filteredTopics = tags?.filter(topic => topic.name.toLowerCase().includes(search.toLowerCase()));
            setTopics(filteredTopics);
        } else {
            setTopics(originalTopics);
        }
    }, 300);

    return (
        <div>
            <input
                className='flex-auto w-full text-wrap bg-slate-50 px-1.5 py-1 rounded-md'
                name="search"
                placeholder={"Search Topics"}
                onChange={(e) => handleSearch(e.target.value)}
            />
            <div>
                {topics?.map((topic) => (
                    <div key={topic.id}>
                        <p>{topic.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}