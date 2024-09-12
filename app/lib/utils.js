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
                        throw new Error(`Failed to fetch:`)
                }
                const buffer = await res.arrayBuffer()
                const { base64 } = await getPlaiceholder(buffer)
                return base64;
        } catch (error) {
                // if(error instanceof Error) console.log(error.stack)
                console.log(error.stack)
        }
}

function getObjectPath(obj, pathArray) {
        return pathArray.reduce((acc, key) => acc && acc[key], obj);
    }
export async function allBlurredDataUrls(imageArray, path = 1) {
        let paths;
        switch (path) {
                case 2:
                    paths = ['profile_image', 'large']; // Sesuaikan path dinamis
                    break;
                default:
                    paths = ['urls', 'regular']; // Sesuaikan path dinamis
                    break;
            }
        try {
                
                const base64images = imageArray.map(image => getBase64(getObjectPath(image, paths)))
                const base64Results = await Promise.all(base64images);
                const imageWithBase64 = imageArray.map((image, index) => {
                        const targetPath = getObjectPath(image, paths.slice(0, paths.length - 1));
                        targetPath.base64 = base64Results[index];

                        return image;
                })
                return imageWithBase64
        } catch (error) {
                console.log(error)
        }
}

export async function splitArrayIntoThree(arr) {
        const size = Math.ceil(arr.length / 3)
        const part1 = arr.slice(0, size)
        const part2 = arr.slice(size, size * 2)
        const part3 = arr.slice(size * 2, arr.length)
        console.log(part1)
        return [part1 , part2 , part3]
}