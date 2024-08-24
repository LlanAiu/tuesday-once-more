import { searchTopicByName } from '@/app/lib/data';
import { TopicData } from '@/app/lib/data-structure';

//Needs to be rerendered every time the query string is updated, and I'm honestly not sure if that's automatic, ig will see
//Also, probably a good idea to use partial pre-rendering for this since it might reload the entire page...?
export default async function Table({query} : {query: string}) {
    const tags = await searchTopicByName(query);

    return (
        <div>
            {tags && tags.map((tag: TopicData) => {
                return (
                    <div key={tag.id}>
                        <p className='text-lg font-bold'>{tag.name}</p>
                    </div>
                )
            })}
        </div>  
    );
}