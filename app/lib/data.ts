import { FilterData, InputData, ProblemData, TopicData, TopicInput } from './data-structure';
import mysql from 'mysql2/promise';
import 'dotenv/config';

let connection : mysql.Connection;
const PROBLEMS_PER_PAGE = 5;

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
                ${problem.difficulty / 10}
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

//Must finish tags first before finishing this function
export async function fetchProblemByFilterData(data: FilterData){
    try {
        let query = `SELECT * FROM problems
            JOIN links ON problems.id = links.problem_id`;
        if(data.topics || data.difficulty){
            query += ' WHERE';
            if(data.topics){
                query += `tag_id IN (${data.topics.join(',')})`;
                query += data.difficulty ? 'AND' : '';
            }
            query += data.difficulty ? ` difficulty = ${data.difficulty}` : ''; 
        }
        query += 'ORDER BY RAND() LIMIT 1';

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
        const totalProblems = (result as Array<Number>)[0];
        return Math.ceil(totalProblems.valueOf() / PROBLEMS_PER_PAGE);
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