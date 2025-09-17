/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
   async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://room-kart.onrender.com/:path*', // The URL of your backend
      },
    ];
  },
};

export default nextConfig;
