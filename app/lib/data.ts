import { FilterData, InputData, ProblemData, TopicData, TopicInput } from './data-structure';
import mysql from 'mysql2/promise';
import 'dotenv/config';

let connection : mysql.Connection;

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
        console.log(fields);
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
        let query = 'SELECT * FROM problems';
        if(data.topics || data.difficulty){
            query += ' WHERE';
            if(data.topics){
                query += ` `;
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

export async function fetchAllTopics(){
    try {
        const [result, fields] = await connection.query({
            sql: 'SELECT * FROM topics'
        });

        console.log(result);

        return (result as Array<TopicData>);
    } catch (error) {
        console.log(error);
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