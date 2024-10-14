import Link from 'next/link';
import { fetchRecentProblems, fetchRecentTopics, fetchStats, startStats, updateStreak } from '../lib/data';
import ProblemCard from '../components/home-display/problem-display';
import TopicCard from '../components/home-display/topic-display';


export default async function Page(){
    
    await startStats();
    await updateStreak();
    const stats = await fetchStats();
    
    const recentProblems = await fetchRecentProblems();
    const recentTopics = await fetchRecentTopics();

    return (
        <div className='mx-3.5 pt-3.5'>
            <h1 className='text-2xl text-gray-800 mb-4'><b>Tuesday Once More</b></h1>
            <div className='grid grid-cols-2 grid-rows-2 h-auto'>
                <div className='p-1.5 border-2 border-black row'>
                    <h2 className='pb-1'><b><u>How You're Doing</u></b></h2>
                    <div className='space-y-1'>
                        <p><u>Streak:</u> {stats?.streak}</p>
                        <p><u>Problems Solved:</u> {stats?.solved}</p>
                        <p><u>Problems Attempted:</u> {stats?.attempted}</p>
                        <p><u>Last Activity:</u> {stats?.lastSolved.toDateString()}</p>
                    </div>
                </div>
                <div className='p-1.5 border-2 border-black'>
                    <h2 className='pb-3'><b><u>Review</u></b></h2>
                    <div className='space-y-2'>
                        <p>Got a few minutes?</p>
                        <p>How about a review problem?</p>
                    </div>
                    <div className='h-max py-1 w-20 mt-5 bg-slate-100 rounded-md text-center hover:bg-slate-300'> 
                        <Link href='/home/review'>
                                <p>Let's Go</p>
                        </Link>
                    </div>

                </div>
                <div className='p-1.5 border-2 border-black'>
                    <h2 className='pb-2'><b><u>Recently Added Problems</u></b></h2>
                    <div className='space-y-2'>
                        {recentProblems && recentProblems.map((problem) => {
                            return (
                                <ProblemCard key={problem.id} problem={problem} />
                            );
                        })}
                    </div>
                </div>
                <div className='p-1.5 border-2 border-black'>
                    <h2 className='pb-2'><b><u>Recently Added Topics</u></b></h2>
                    <div className='space-y-2'>
                        {recentTopics && recentTopics.map((topic) => {
                            return (
                                <TopicCard key={topic.id} topic={topic} />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}