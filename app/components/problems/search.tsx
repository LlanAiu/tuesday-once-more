import { TopicData } from '@/app/lib/data-structure';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import SearchResult from './search-result';

export default function Search ({tags} : {tags: TopicData[]}) {
    const originalTopics = tags;
    const emptyTags: TopicData[] = [];
    const [topics, setTopics] = useState(emptyTags);
    const [selectedTopics, setSelectedTopics] = useState<TopicData[]>([]);
    const inputRef = useRef(null);
    useOutsideAlerter(inputRef, () => handleFocusBlur("BLUR", null));

    function addTopic(topic: TopicData){
        setSelectedTopics((a) => [...a, topic]);
    }

    function removeTopic(topic: TopicData){
        setSelectedTopics((a) => a.filter(t => t.id !== topic.id));
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
        <div ref={inputRef}>
            <text>{selectedTopics.map(t => t.name).join(", ")}</text>
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
                value={selectedTopics.map(t => t.id).join("/")}
            />
            <div>
                {topics?.map((topic) => (
                    <SearchResult key={topic.id} topic={topic} addTopic={addTopic} removeTopic={removeTopic} initialCheck={selectedTopics.includes(topic)}/>
                ))}
            </div>
        </div>
    );
}

function useOutsideAlerter(ref: MutableRefObject<any>, callback: () => void){
    useEffect(() => {
        function handleClickOutside(event: MouseEvent){
            if(ref.current && !ref.current.contains(event.target)){
                callback();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}