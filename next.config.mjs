/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [process.env.NEXT_PUBLIC_IMAGE_CLOUDFRONT]
    }
};

export default nextConfig;
