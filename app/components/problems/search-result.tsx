import { TopicData } from '@/app/lib/data-structure';

export default function SearchResult({topic, addTopic, removeTopic} : {
    topic: TopicData,
    addTopic: (topicID: number) => void,
    removeTopic: (topicID: number) => void
}) {
    
    function handleCheck(checked: boolean){
        if(checked){
            addTopic(topic.id);
        } else {
            removeTopic(topic.id);
        }
    }
    
    return (
        <div>
            <input
                type="checkbox"
                onChange={(e) => handleCheck(e.target.checked)}
            />
            <p>{topic.name}</p>
        </div>
    );
}