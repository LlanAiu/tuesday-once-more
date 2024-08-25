import { TopicData } from '@/app/lib/data-structure';
import { useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import SearchResult from './search-result';

export default function Search ({tags} : {tags: TopicData[]}) {
    const originalTopics = tags;
    const emptyTags: TopicData[] = [];
    const [topics, setTopics] = useState(emptyTags);
    const inputRef = useRef<HTMLInputElement>(null);

    let topicIDs: number[] = [];

    function addTopic(topicID: number){
        topicIDs.push(topicID);
        console.log(topicIDs);
    }

    function removeTopic(topicID: number){
        topicIDs = topicIDs.filter(id => id !== topicID);
        console.log(topicIDs);
    }

    const handleSearch = useDebouncedCallback((search: string) => {
        if(search.length > 0){
            const filteredTopics = tags.filter(topic => topic.name.toLowerCase().includes(search.toLowerCase()));
            setTopics((a) => filteredTopics);
        } else {
            console.log('set');
            setTopics((a) => originalTopics);
        }
    }, 250);

    function handleFocusBlur(state: "FOCUS" | "BLUR", search: string | null){
        if(state === "FOCUS"){
            if(search === null){
                setTopics((a) => originalTopics);
            } else {
                setTopics((a) => originalTopics.filter(topic => topic.name.toLowerCase().includes(search.toLowerCase())));
            }
        } else {
            setTopics((a) => emptyTags);
        }
    }

    return (
        <div
            ref={inputRef}
            onClick={(e) => inputRef.current?.focus()}
            // Doesn't quite work the way I want it to, will look into it later
        >
            <input
                id="topic-search"
                className='flex-auto w-full text-wrap bg-slate-50 px-1.5 py-1 rounded-md'
                placeholder={"Search Topics"}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={(e) => handleFocusBlur("FOCUS", e.target.value)}
            />
            <input
                type="hidden"
                name="topics"
                value={topicIDs.join("/")}
            />
            <div>
                {topics?.map((topic) => (
                    <SearchResult key={topic.id} topic={topic} addTopic={addTopic} removeTopic={removeTopic}/>
                ))}
            </div>
        </div>
    );
}