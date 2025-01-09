/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: process.env.NEXT_PUBLIC_IMAGE_CLOUDFRONT
            }
        ]
    },
    env: {
        NEXT_PUBLIC_PRODUCT_SERVICE: process.env.NEXT_PUBLIC_PRODUCT_SERVICE,
        NEXT_PUBLIC_CART_SERVICE: process.env.NEXT_PUBLIC_CART_SERVICE,
        NEXT_PUBLIC_ORDER_SERVICE: process.env.NEXT_PUBLIC_ORDER_SERVICE,
        NEXT_PUBLIC_PAYMENT_SERVICE: process.env.NEXT_PUBLIC_PAYMENT_SERVICE,
    },
};

export default nextConfig;
