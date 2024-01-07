/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/musics',
                permanent: true,
            },
        ];
    }
};

module.exports = nextConfig;
