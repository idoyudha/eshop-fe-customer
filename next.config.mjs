/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
        userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
        userPoolDomain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
        productService: process.env.NEXT_PUBLIC_PRODUCT_SERVICE,
        cartService: process.env.NEXT_PUBLIC_CART_SERVICE,
        orderService: process.env.NEXT_PUBLIC_ORDER_SERVICE,
        paymentService: process.env.NEXT_PUBLIC_PAYMENT_SERVICE,
    }
};

export default nextConfig;
