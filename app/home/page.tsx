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
        <div>
            <h1>Home</h1>
            <div className='grid grid-cols-2 grid-rows-2'>
                <div className='border-2 border-black'>
                    <h2>How You're Doing</h2>
                    <p>Streak: {stats?.streak}</p>
                    <p>Problems Solved: {stats?.solved}</p>
                    <p>Problems Attempted: {stats?.attempted}</p>
                    <p>Last Activity: {stats?.lastSolved.toDateString()}</p>
                </div>
                <div className='border-2 border-black'>
                    <h2>Review</h2>
                    <p>Placeholder Text</p>
                    <Link href='/home/review'>
                        <p>Go</p>
                    </Link>
                </div>
                <div className='border-2 border-black'>
                    <h2>Recently Added Problems</h2>
                    {recentProblems && recentProblems.map((problem) => {
                        return (
                            <ProblemCard key={problem.id} problem={problem} />
                        );
                    })}
                </div>
                <div className='border-2 border-black'>
                    <h2>Recently Added Topics</h2>
                    {recentTopics && recentTopics.map((topic) => {
                        return (
                            <TopicCard key={topic.id} topic={topic} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}