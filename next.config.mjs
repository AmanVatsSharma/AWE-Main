/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["aceternity.com", "firebasestorage.googleapis.com", "img.freepik.com"], // Add the external domain here
    },
    typescript: {
        ignoreBuildErrors: true,
    }
};

export default nextConfig;
