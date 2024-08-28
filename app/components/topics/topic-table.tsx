import { TopicData } from '@/app/lib/data-structure';

export default function TopicTable({tags} : {tags: TopicData[]}){
    return (
        <div>
            {tags.map((tag) => {
                return (
                    <div key={tag.id}>
                        <p>{tag.name}</p>
                        <p>{tag.description}</p>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                );
            })}
        </div>
    );

}