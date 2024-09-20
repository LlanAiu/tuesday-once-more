import { fetchStats, startStats, updateStreak } from '../lib/data';


export default async function Page(){
    
    await startStats();
    await updateStreak();
    const stats = await fetchStats();

    return (
        <>
            <h1>Home</h1>
            <div>
                <h2>Statistics</h2>
                <p>Streak: {stats?.streak}</p>
                <p>Problems Solved: {stats?.solved}</p>
                <p>Problems Attempted: {stats?.attempted}</p>
            </div>
            <div>
                <h2>Review</h2>
            </div>
            <div>
                <h2>View All Problems</h2>
            </div>
            <div>
                <h2>View All Topics</h2>
            </div>
        </>
    );
}