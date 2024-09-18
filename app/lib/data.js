import { hashPassword } from "./auth";
import { relatedImg , data , randUrl, topicPhoto } from "./static_data";
import { query } from "./db"; 
import { RandomNumber } from "./utils";

export async function addUser({ username, email, password }) {
    let hashedpassword = await hashPassword(password);
    
    try {
        await query(`INSERT INTO "user" (username , email , password) VALUES ($1 , $2 , $3);`, 
            [username, email, hashedpassword]
        )
    } catch (error) {
        console.log(error)
        throw new Error('Failed to insert user to database')
    }
}
export async function getUser(id) {
    try {
        const userObject = (await query('SELECT * FROM "user" WHERE id = $1;', [id])).rows[0]
        const userDTO = {
            username: userObject.username,
            email: userObject.email
        }
        return userDTO
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
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}
export async function getTopic(topic) {
    const version = 'v1';
    const authToken = process.env.AUTH_TOKEN 
    const url = `https://api.unsplash.com/topics/${topic}`;
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept-Version': version,
                'Authorization': authToken
            }
        })
        if (!(await res).ok) {
            throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`)
        }
        const data = await res.json()
        return data;
    } catch (error) {
        console.log(error)
    }
}
export async function getTopicPhoto(topic , page , limit) {
    const version = 'v1';
    const authToken = process.env.AUTH_TOKEN 
    const url = `https://api.unsplash.com/topics/${topic}/photos?page=${page}&per_page=${limit}`;
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept-Version': version,
                'Authorization': authToken
            }
        })
        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`)
        }
        const data = await res.json()
        return data;
    } catch (error) {
        console.log(error)
    }
}
export async function getImgDetail(id) {
    const version = 'v1';
    const authToken = process.env.AUTH_TOKEN 
    const url = `https://api.unsplash.com/photos/${id}`;
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
export async function searchImg(term,page , limit) {
    const version = 'v1';
    const authToken = process.env.AUTH_TOKEN 
    const url = `https://api.unsplash.com/search/photos?query=${term}&per_page=${limit}&page=${page}`;
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
export async function getPageData(term, page = 1, limit = 12, topic) {
    console.log(`data ${topic}`)
    let data;
    if (term) {
        const searchData = await searchImg(term, page, limit);
        if (searchData && searchData.results) {
            data = searchData.results;
        } else {
            console.error('No results found in searchData:', searchData);
        }
    } else if (topic) {
        data = await getTopicPhoto(topic, 1, 12);
        console.log(`topic data : ${data}`)
        return data;
    }
    else {
        data = await getImg(page , limit);
        console.log('Data fetched from getImg:', data);
        if (!data) {
            console.error('No data returned from getImg.');
        }
    }
    return data;
    }
export async function getFakeData(limit , mode) {
    if (mode == 'object') {
        return topicPhoto[0]
    } else {
        // const fakeData = [];
        // for (let index = 0; index < limit; index++) {
        //     let newData = data;
        //     newData = {
        //         ...newData,
        //         urls: {
        //             regular: randUrl[RandomNumber(0, 5)]
        //         }
        //     }
        //     fakeData.push(newData)
        // }
        // return fakeData
        return topicPhoto
    }
}
export async function getRelatedImg(relatedImg) {
    // console.log(relatedImg.related_collections.results)
    const relatedData = relatedImg.related_collections.results
    const datas = relatedData.flatMap((item) => item.preview_photos)
    // const data = relatedData.map(data => data.preview_photos.map(item => item))
    // console.log(relatedData[0].preview_photos)
    return datas;
}