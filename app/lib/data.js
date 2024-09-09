import { hashPassword } from "./auth";
import { query } from "./db"; 

const data = {
    id: '20A4KOtqmEI',
    created_at: '2024-07-18T19:49:40Z',
    urls: {
        regular: 'https://images.unsplash.com/photo-1721332149069-a470150ef51c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NTAzMDl8MXwxfGFsbHwxfHx8fHx8Mnx8MTcyNTg1NDQ2Mnw&ixlib=rb-4.0.3&q=80&w=1080'
    },
    user: {
        name: 'Samsung Memory'
    },
    alt_description: 'A woman standing in front of a flat screen TV'
}
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

export async function getImg(page , limit) {
    const version = 'v1';
    const authToken = process.env.AUTH_TOKEN 
    const url = `https://api.unsplash.com/photos?page=${page}&per_page=${limit}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept-Version': version,
                'Authorization': authToken
            }
        })
        if (!response.ok) {
            throw new Error('Failed to fetch : ' , response.status)
        }
        const data = await response.json()
        return data;
    } catch (error) {
        console.log(error)
    }
}
export async function getFakeData() {
    const fakeData = [];
    for (let index = 0; index < 10; index++) {
        fakeData.push(data)
    }
    return fakeData
}