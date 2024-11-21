/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa'


  
  const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'img.sndimg.com',
          pathname: '/**'
        }
      ]
    },
    
  };

  const pwaConfig = withPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
  });
  
  export default pwaConfig(nextConfig);