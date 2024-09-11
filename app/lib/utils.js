import { getPlaiceholder } from 'plaiceholder';
import sharp from 'sharp';
export function FormatDate(dateString) {
        const date = new Date(dateString);
        
        const day = String(date.getDate()).padStart(2, '0'); // Dapatkan hari (DD)
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Dapatkan bulan (MM), bulan di JavaScript berbasis 0
        const year = String(date.getFullYear()).slice(2); // Dapatkan 2 digit terakhir dari tahun (YY)
      
        return `${day}:${month}:${year}`
}

export function RandomNumber(minParam, maxParam) {
        const min = Math.ceil(minParam)
        const max = Math.ceil(maxParam)
        return Math.floor(Math.random() * (max - min + 1)) + min
        
}
export async function getBase64(imageUrl) {
        try {
                const res = await fetch(imageUrl);
                if (!res.ok) {
                        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`)
                }
                const buffer = await res.arrayBuffer()
                const { base64 } = await getPlaiceholder(buffer)
                return base64;
        } catch (error) {
                if(error instanceof Error) console.log(error.stack)
        }
}

export async function allBlurredDataUrls(imageArray) {
        const base64images = imageArray.map(image => getBase64(image.urls.regular))
        const base64Results = await Promise.all(base64images);
        const imageWithBase64 = imageArray.map((image, index) => {
                image.urls.base64 = base64Results[index];
                return image;
        })
        return imageWithBase64
}