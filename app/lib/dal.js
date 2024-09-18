import 'server-only';
import { cookies } from 'next/headers';
import { decrypt } from './session';
import { redirect } from 'next/dist/server/api-utils';

export const verifySession = cache(async () => {
    const cookie = cookies.get('session')?.value
    const session = await decrypt(cookie)

    if (!session.userId) {
        redirect('/login')
    }
    return {
        isAuth: true,userId: session.userId
    }
})

export const getUser = cache(async () => {
    const session = await verifySession()
    if (!session) return null
   
    try {
        const userObject = (await query('SELECT * FROM "user" WHERE id = $1;', [id])).rows[0]
        return userObject
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch user')
    }
  })