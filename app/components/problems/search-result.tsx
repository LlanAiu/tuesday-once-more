import { TopicData } from '@/app/lib/data-structure';
import { useState } from 'react';

export default function SearchResult({topic, addTopic, removeTopic, initialCheck} : {
    topic: TopicData,
    addTopic: (topicID: TopicData) => void,
    removeTopic: (topicID: TopicData) => void
    initialCheck: boolean
}) {
    
    const [checked, setChecked] = useState(initialCheck);
    let override = initialCheck;

    function handleCheck(){
        setChecked((check) => !check);
        override = !override;
        if(override){
            addTopic(topic);
            console.log("added topic " + topic.name);
        } else {
            removeTopic(topic);
            console.log("removed topic " + topic.name);
        }
    }
    
    return (
        <div className='bg-slate-50 hover:bg-slate-300 pl-2 py-1 rounded-sm'>
            <button type='button' className='w-full text-left pl-2' onClick={handleCheck}>
                {checked ? <p>✓ {topic.name}</p> : <p>+ {topic.name}</p>}
            </button>
        </div>
    );
}