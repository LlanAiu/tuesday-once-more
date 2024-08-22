import { ProblemData } from './data-structure';
import mysql from 'mysql2/promise';
import 'dotenv/config';

let connection : mysql.Connection;

try {
    connection = await mysql.createConnection({
        host: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DATABASE
    });

    const [result, field] = await connection.query(`
        CREATE DATABASE IF NOT EXISTS problem_db;
        USE problem_db;
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

    

    console.log('Database and table created successfully');
    
} catch (err){
    console.log(err);
}

export async function createProblem(problem: ProblemData){
    try {
        const [result, fields] = await connection.query(
            `INSERT INTO problems (title, description, example, difficulty, solution, notes, lastSeen, successRate)
             VALUES (${problem.title}, ${problem.description}, ${problem.example}, ${problem.difficulty}, ${problem.solution}, ${problem.notes}, ${problem.lastSeen}, ${problem.successRate})`
        );

        console.log(result);
        console.log(fields);
        console.log('Problem created successfully');
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


export async function fetchProblemById(id: number){
    
    try {
        const [result, fields] = await connection.query({
            sql: `SELECT * FROM problems WHERE id = ${id}`,
            rowsAsArray: true
        });

        console.log(result);
        console.log(fields);
        console.log(`successfully fetched problem with id: ${id}`);

        return (result as Array<ProblemData>)[0];
    } catch (error) {
        console.log(error);
    }
    
    // return {
    //     title: 'Nothing To See Here',
    //     id: id,
    //     description: 'Lorem Ipsum, dolor sit amet, etc.',
    //     example: 'There is no example, but pretend like there is',
    //     difficulty: 5,
    //     solution: 'Just imagine the solution exists and is placed right here, even tho it is not',
    //     notes: 'There are no notes, but you can pretend like there are',
    //     lastSeen: new Date(),
    //     successRate: 1
    // };
}