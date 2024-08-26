import { ProblemData, TopicData } from '@/app/lib/data-structure';

export default function ProblemCard({ problem, topics } : { problem: ProblemData, topics: TopicData[] }) {
    
    const date = problem.lastSeen;
    
    return (
        <div key={problem.id}>
            <h1><b>{problem.title}</b></h1>
            <p>{problem.description}</p> // will cut off if too long
            <p>Difficulty: {problem.difficulty}</p>
            <p>Topics: {topics.map(t => t.name).join(", ")}</p>
            <p>Accuracy: {problem.successRate}</p>
            <p>Last Seen: {date.getMonth + "/" + date.getDay + "/" + date.getFullYear}</p>
            <button>Delete</button>
            <button>Edit</button>
        </div>
    );
}