/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'angular.pixelstrap.net',
                port: '',
                pathname:'/**'
            }
        ],
        domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com']
    }
};

export default nextConfig;
