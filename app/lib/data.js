import { hashPassword } from "./auth";
import { query } from "./db"; 

export async function addUser({ username, email, password }) {
    let hashedpassword = await hashPassword(password);
    console.log(hashedpassword)
    
    try {
        await query(`INSERT INTO "user" (username , email , password) VALUES ($1 , $2 , $3);`, 
            [username, email, hashedpassword]
        )
    } catch (error) {
        console.log(error)
        throw new Error('Failed to insert user to database')
    }
}
export async function getUser() {
    try {
        const userObject = await query('SELECT * FROM "user"; ')
        return userObject.rows;
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch user')
    }
}

export async function getImg() {
    const version = 'v1';
    const authToken = process.env.AUTH_TOKEN 
    const url = 'https://api.unsplash.com/photos?page=1&per_page=5';
    try {
        const response = fetch(ur)
    } catch (error) {
        
    }
}