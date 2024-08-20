import { ProblemData } from './data-structure';
import mysql from 'mysql2/promise';
import 'dotenv/config';

// try {
//     const connection = await mysql.createConnection({
//         host: process.env.SQL_HOST,
//         user: process.env.SQL_USER,
//         password: process.env.SQL_PASSWORD,
//         database: process.env.SQL_DATABASE
//     });
    
//     console.log('Connected?');
    
// } catch (err){
//     console.log(err);
// }


//Filler function, for now
export async function fetchProblemById(id: string): Promise<ProblemData>{
    return {
        title: 'Nothing To See Here',
        id: id,
        description: 'Lorem Ipsum, dolor sit amet, etc.',
        example: 'There is no example, but pretend like there is',
        difficulty: 5,
        solution: 'Just imagine the solution exists and is placed right here, even tho it is not',
        notes: 'There are no notes, but you can pretend like there are',
        lastSeen: new Date(),
        successRate: 1
    };
}