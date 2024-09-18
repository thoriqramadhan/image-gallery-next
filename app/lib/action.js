'use server'

import { z } from 'zod';
import { hashPassword } from "@/app/lib/auth";
import { query } from "@/app/lib/db"
import { createSession } from './session';
import { redirect } from 'next/navigation'; 

const isEmailUnique = async (email) => {
    // mengecek di db dengan count total column yang memenuhi kondisi dari from
    const res = await query('SELECT COUNT(*) FROM "user" WHERE email = $1', [email])
    // cek jika kosong maka true jika tidak maka false
    return res.rows[0].count == 0;
}
const userSchema = z.object({
    username: z.string().min(3),
    email: z.string().email({ message: 'Format email tidak sesuai' }).refine(
        async (email) => {
            const unique = await isEmailUnique(email)
            return unique;
        },
        {message: 'Email sudah di gunakan'}
    ),
    password: z.string().min(6)
})

export async function createUser(formData) {
    const user = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password')
    }
    // const result = await userSchema.parseAsync(user)
    // const { username, email, password } = result;
    const { username, email, password } = user;
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
