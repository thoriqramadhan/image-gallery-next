'use server'

import { z, ZodError } from 'zod';
import { comparePassword, hashPassword } from "@/app/lib/auth";
import { query } from "@/app/lib/db"
import { createSession } from './session';
import { redirect } from 'next/navigation'; 
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const isEmailUnique = async (email) => {
    // mengecek di db dengan count total column yang memenuhi kondisi dari from
    const res = await query('SELECT COUNT(*) FROM "user" WHERE email = $1', [email])
    // cek jika kosong maka true jika tidak maka false
    return res.rows[0].count == 0;
}
const userSchema = z.object({
    username: z.string().min(3 , {message: 'Name must be atleast 3 characters.'}),
    email: z.string().email({ message: 'Format email tidak sesuai' }).refine(
        async (email) => {
            const unique = await isEmailUnique(email)
            return unique;
        },
        {message: 'Email sudah di gunakan'}
    ),
    password: z.string().min(6  , { message: 'Password must be atleast 6 characters'})
})

export async function createUser(formData) {
    const user = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password')
    }
    let result;
    try {
        result = await userSchema.parseAsync(user)
    } catch (error) {
        if (error instanceof ZodError) {
            return {
                errors: error.flatten().fieldErrors
            }
        }
    }
    const { username, email, password } = result;
    // const { username, email, password } = result;
    let userId;
    let hashedpassword = await hashPassword(password);
    try {
        const insertResult = await query(`INSERT INTO "user" (username , email , password) VALUES ($1 , $2 , $3) RETURNING id;`, 
            [username, email, hashedpassword]
        )
        userId = insertResult.rows[0].id// Mengambil ID dari hasil query
        if (!userId) {
            throw new Error('Failed to fetch id')
        }
            
        console.log('User created with ID:', userId);

        // Membuat session untuk user yang baru dibuat
        await createSession(userId);
    } catch (error) {
        console.log('Databse Error',error)
        // throw new Error('Failed to insert user to database')
    }
    if (userId){
        redirect('/profile')
    }
}
export async function loginUser(formData) {
    const user = {
        name: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password')
    }
    const { name, email, password } = user;
    const userDb = (await query('SELECT * FROM "user" WHERE email = $1', [email])).rows[0]
    if (!userDb) {
        return;
    }

    const isPasswordMatch = await comparePassword(password, userDb.password)
    if (!isPasswordMatch) {
        console.log('Password didn`t match')
        return;
    }
        await createSession(userDb.id)
        redirect('/?page=1&per_page=12')
}
export async function updateUser(formData) {
    const user = {
        name: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password')
    }
    const { name, email, password } = user;
    const userDb = await getUserByEmail(email)
    let hashedpassword = await hashPassword(password);
    let isPasswordMatch = true
    if (userDb) {
        isPasswordMatch = await comparePassword(password , userDb.password)
    }
    console.log(!isPasswordMatch)
    const rules = {
        insert: 'username = $1, email = $2, password = $3',
        variables: [
            name , email , hashedpassword
        ]
    }
    
    if (userDb) {
        if (email !== userDb.email && !isPasswordMatch) {
            rules.insert = 'username = $1, email = $2, password = $3';
            rules.variables = [name, email, hashedpassword];
        } else if (email !== userDb.email) {
            rules.insert = 'username = $1, email = $2';
            rules.variables = [name, email];
        } else if (!isPasswordMatch) {
            rules.insert = 'username = $1, password = $2';
            rules.variables = [name, hashedpassword];
        }
    } else {
        rules.insert = 'username = $1, email = $2, password = $3';
        rules.variables = [name, email, hashedpassword];
    }
    const updateResult = await query(
        `UPDATE "user" 
         SET ${rules.insert} 
         WHERE id = $${rules.variables.length + 1} RETURNING id;`,
        [...rules.variables, userDb.id]
    );
}
export async function logout() {
    cookies().delete('session')
    cookies().set('flashMessage' , JSON.stringify({message: 'user logout sucessfully' , type: 'success'}) , {path:'/' , maxAge:10 })
    redirect('/login')
}
export async function getUserByEmail(email) {
    const user = (await query('SELECT * FROM "user" WHERE email = $1', [email])).rows[0]
    if (!user) return;
    return user
}