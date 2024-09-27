import { CountReturn, FilterData, InputData, ProblemData, TopicData, TopicInput, UserStatistics } from './data-structure';
import mysql from 'mysql2/promise';
import 'dotenv/config';

let connection : mysql.Connection;
const PROBLEMS_PER_PAGE = 4;

try {
    connection = await mysql.createConnection({
        host: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD
    });

    await connection.query('CREATE DATABASE IF NOT EXISTS problem_db');
    await connection.query('USE problem_db');

    await connection.query(`
        CREATE TABLE IF NOT EXISTS problems (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            example TEXT,
            difficulty INT NOT NULL,
            solution TEXT NOT NULL,
            notes TEXT, 
            lastSeen DATE NOT NULL,
            successRate FLOAT NOT NULL
        );
    `);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS topics (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT
        );
    `);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS links (
            problem_id INT,
            tag_id INT,
            FOREIGN KEY (problem_id) REFERENCES problems(id),
            FOREIGN KEY (tag_id) REFERENCES topics(id)
        );
    `);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS stats (
            id INT,
            streak INT,
            solved INT,
            attempted INT,
            lastSolved DATE
        );
    `);

    console.log('Database and Tables Created Successfully');
} catch (err){
    console.log(err);
}

export async function createProblem(problem: InputData){
    try {
        
        let today = new Date();
        let dateString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        
        const [result, fields] = await connection.query(`
            INSERT INTO problems (title, description, example, difficulty, solution, notes, lastSeen, successRate)
            VALUES (
                '${problem.title}', 
                '${problem.description}', 
                ${problem.example ? `\'${problem.example}\'`: 'NULL'}, 
                ${problem.difficulty}, 
                '${problem.solution}', 
                ${problem.notes ? `\'${problem.notes}\'` : 'NULL'}, 
                DATE '${dateString}', 
                ${(10 - problem.difficulty) / 10}
            )
        `);

        console.log(result);
        console.log('Problem created successfully with data: ' + JSON.stringify(problem));
    } catch (error){
        console.log(error);
    }
}

export async function createTopic(topic: TopicInput){
    try {
        const [result, fields] = await connection.query(`
            INSERT INTO topics (name, description)
            VALUES (
                '${topic.name}', 
                ${topic.description ? `\'${topic.description}\'` : 'NULL'}
            )
        `);

        console.log(result);
        console.log('Topic created successfully with data: ' + JSON.stringify(topic));
    } catch (error){
        console.log(error);
    }
}

export async function fetchRandomProblem() {
    try{
        const [result, fields] = await connection.query({
            sql: 'SELECT * FROM problems ORDER BY RAND() LIMIT 1',
            rowsAsArray: true
        });


        console.log(result);
        console.log(fields);
        console.log('Successfully fetched random problem');

        return (result as Array<ProblemData>)[0];
    } catch (error) {
        console.log(error);
    }
}


export async function fetchProblemByFilterData(data: FilterData){
    console.log(data);
    try {
        let query = `SELECT id, title, description, example, difficulty, solution, notes, lastSeen, successRate 
            FROM problems
            LEFT JOIN links 
            ON problems.id = links.problem_id
            WHERE `;
        if(data.topics && data.topics.length > 0){
            query += `tag_id IN (${data.topics.join(',')}) AND `;
        }
        query += `difficulty >= ${data.minDifficulty} AND difficulty <= ${data.maxDifficulty}`;

        query += ' ORDER BY RAND() LIMIT 1';

        const [result, fields] = await connection.query({
            sql: query,
        });

        console.log(result);
        return (result as Array<ProblemData>)[0];
    } catch (err) {
        console.log(err);
    }
}

export async function fetchProblemById(id: number){
    
    try {
        const [result, fields] = await connection.query({
            sql: `SELECT * FROM problems WHERE id = ${id}`
        });

        console.log(result);
        console.log(`successfully fetched problem with id: ${id}`);

        return (result as Array<ProblemData>)[0];
    } catch (error) {
        console.log(error);
    }
}

export async function fetchProblemPages(query: string){
    try {
        const [result, fields] = await connection.query({
            sql: 
                `SELECT COUNT(*) FROM problems
                WHERE title LIKE '%${query}%' OR description LIKE '%${query}%'`
        });

        console.log(result);
        const totalProblems = (result as Array<CountReturn>)[0];
        return Math.ceil(totalProblems['COUNT(*)'] / PROBLEMS_PER_PAGE);
    } catch(error) {
        console.log(error);
    }
}

export async function fetchProblemByPage(query: string, page: number){
    try {
        const [result, fields] = await connection.query({
            sql: 
                `SELECT * FROM problems
                WHERE title LIKE '%${query}%' OR description LIKE '%${query}%'
                LIMIT ${PROBLEMS_PER_PAGE} OFFSET ${PROBLEMS_PER_PAGE * (page - 1)}`
        });

        console.log(result);
        return (result as Array<ProblemData>);
    } catch (error){
        console.log(error);
        return [];
    }
}

export async function editProblembyId(id: number, problem: InputData){
    try {
        await connection.query(`
            UPDATE problems
            SET title = '${problem.title}', description = '${problem.description}', example = '${problem.example}', difficulty = ${problem.difficulty}, solution = '${problem.solution}', notes = '${problem.notes}'
            WHERE id = ${id}
        `);

        console.log('Successfully edited problem with id: ' + id);
    } catch (error){
        console.log(error);
    }
}

export async function updateProblemDate(id: number){
    let today = new Date();
    let dateString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    try {
        await connection.query(`
           UPDATE problems
           SET lastSeen = '${dateString}'
           WHERE id = ${id}
        `);

        console.log('Successfully updated date for problem with id: ' + id);
    } catch(error){
        console.log(error);
    }
}

export async function deleteProblemById(id: number){
    try {
        await connection.query(`DELETE FROM links WHERE problem_id = ${id}`);
        await connection.query(`DELETE FROM problems WHERE id = ${id}`);
        
        console.log('Successfully deleted problem with id: ' + id);
    } catch (error){
        console.log(error);
    }
}

export async function fetchAllTopics(){
    try {
        const [result, fields] = await connection.query({
            sql: 'SELECT * FROM topics'
        });

        console.log(result);

        return (result as Array<TopicData>);
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function fetchTopics(query: string, page: number){
    try {
        const [result, fields] = await connection.query({
            sql: `SELECT * FROM topics WHERE name LIKE '%${query}%' LIMIT ${PROBLEMS_PER_PAGE} OFFSET ${PROBLEMS_PER_PAGE * (page - 1)}`
        });

        console.log(result);

        return (result as Array<TopicData>);
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function fetchTopicById(id: number){
    try {
        const [result, fields] = await connection.query({
            sql: `SELECT * FROM topics WHERE id = ${id}`
        });

        console.log(result);

        return (result as Array<TopicData>)[0];
    } catch (error){
        console.log(error);
    }
}

export async function fetchTopicsByProblem(id: number){
    try {
        const [result, fields] = await connection.query({
            sql: `
                SELECT id, name, description FROM topics
                JOIN links ON topics.id = links.tag_id
                WHERE links.problem_id = ${id}
            `
        });

        console.log(result);

        return (result as Array<TopicData>);
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function searchTopicByName(name: string){
    try {
        const [result, fields] = await connection.query({
            sql: `SELECT * FROM topics WHERE name LIKE '${name}%'`
        });

        console.log(result);

        return (result as Array<TopicData>);
    } catch (error) {
        console.log(error);
    }
}

export async function editTopicById(topic: TopicData){
    try {
        await connection.query(`
            UPDATE topics
            SET name = '${topic.name}', description = '${topic.description}'
            WHERE id = ${topic.id}
        `);

        console.log('Successfully edited topic with id: ' + topic.id);
    } catch (error){
        console.log(error);
    }
}

export async function deleteTopicById(id: number){
    try {
        await connection.query(`DELETE FROM links WHERE tag_id = ${id}`);
        await connection.query(`DELETE FROM topics WHERE id = ${id}`);
        console.log('Successfully deleted topic with id: ' + id);
    } catch (error){
        console.log(error);
    }
}

export async function addLinkedTopics(problem: InputData, topics: number[]){
    try {
        for(let topic of topics){
            await connection.query(`
                INSERT INTO links (problem_id, tag_id)
                VALUES (
                    (SELECT id FROM problems WHERE title = '${problem.title}'),
                    ${topic}
                )
            `);
        }
        
        console.log('Successfully added linked topics');
    } catch (error){
        console.log(error);
    }
}

export async function removeLinkedTopics(problem_id: number, topics: number[]){
    try {
        for(let topic of topics){
            await connection.query(`
                DELETE FROM links
                WHERE problem_id = ${problem_id} AND tag_id = ${topic}
            `);
        }
    } catch (error){
        console.log(error);
    }
}

export async function startStats(){
    const stats = await fetchStats();
    if(stats){
        return;
    }
    try {
        await connection.query(`
            INSERT INTO stats (id, streak, solved, attempted, lastSolved)
            VALUES (0, 0, 0, 0, DATE '2024-01-01')
        `);
    } catch (error) {
        console.log(error);
    }
}

export async function updateStreak(){
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    try {
        const stats = await fetchStats();
        if(stats){
            if(stats.lastSolved.getTime() <= yesterday.getTime()){
                await connection.query(`
                    UPDATE stats
                    SET streak = 0
                    WHERE id = 0
                `);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export async function incrementStreak(){
    const today = new Date();
    const dateString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    function sameDay(d1: Date, d2: Date){
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    }
    
    try {
        const stats = await fetchStats();
        if(stats && !sameDay(stats.lastSolved, new Date())){
            await connection.query(`
                UPDATE stats
                SET streak = ${stats.streak + 1}, lastSolved = DATE '${dateString}'
                WHERE id = 0
            `); 
        }
    } catch (error) {
        console.log(error);
    }
}

export async function fetchStats(){
    try {
        const [result, fields] = await connection.query({
            sql: 'SELECT * FROM stats'
        });

        return (result as Array<UserStatistics>)[0];
    } catch (error){
        console.log(error);
    }
}

export async function updateProblemCount(correct: boolean){
    try {
        const stats = await fetchStats();
        if(stats){
            if(correct){
                await connection.query(`
                    UPDATE stats
                    SET solved = ${stats.solved + 1}
                    WHERE id = 0
                `);
            }
            await connection.query(`
                UPDATE stats
                SET attempted = ${stats.attempted + 1}
                WHERE id = 0
            `);
        }
    } catch (error){
        console.log(error);
    }
}