import { TopicData } from '@/app/lib/data-structure';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import SearchResult from './search-result';
import clsx from 'clsx';

export default function Search ({tags, initialTags} : {tags: TopicData[], initialTags?: TopicData[]}) {
    const originalTopics = tags;
    const emptyTags: TopicData[] = [];
    const initial = initialTags ? initialTags : [];
    const [topics, setTopics] = useState(emptyTags);
    const [selectedTopics, setSelectedTopics] = useState<TopicData[]>(initial);
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
        <div className='space-y-3' ref={inputRef}>
            <text 
                className={clsx('block mt-2 h-8 bg-slate-50 w-full px-1.5 py-1 rounded-md', {
                    'text-gray-500' : selectedTopics.length === 0,
                    'text-gray-800' : selectedTopics.length > 0
                })}
            >
                {selectedTopics.length > 0 ? selectedTopics.map(t => t.name).join(", ") : "No Topics Selected"}
            </text>
            <input
                id="topic-search"
                className='block w-full text-wrap bg-slate-50 px-1.5 py-1 rounded-md'
                placeholder={"Search Topics"}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={(e) => handleFocusBlur("FOCUS", e.target.value)}
            />
            <input
                type="hidden"
                name="topics"
                value={selectedTopics.map(t => t.id).join("/")}
            />
            <div className='relative bottom-2'>
                {topics?.map((topic) => (
                    <SearchResult key={topic.id} topic={topic} addTopic={addTopic} removeTopic={removeTopic} initialCheck={selectedTopics.map(t => t.id).includes(topic.id)}/>
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