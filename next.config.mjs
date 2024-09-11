import withPlaiceholder from "@plaiceholder/next";
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com' , 'plus.unsplash.com'],
    }
};

export default withPlaiceholder(nextConfig)
