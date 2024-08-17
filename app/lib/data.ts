import { ProblemData } from './data-structure';
import mysql from 'mysql2/promise';
import 'dotenv/config';

try {
    const connection = await mysql.createConnection({
        host: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DATABASE
    });
    
    console.log('Connected?');
} catch (err){
    console.log(err);
}


//Filler function, for now
export async function fetchProblemById(id: string): Promise<ProblemData>{
    return {
        title: 'Nothing',
        id: id,
        description: 'to',
        example: 'See',
        difficulty: 5,
        solution: 'Here',
        notes: 'Lol',
        lastSeen: new Date(),
        successRate: 1
    };
}