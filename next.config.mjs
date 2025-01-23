import path from 'path'; 

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'], 
  },
  webpack(config) {
    config.resolve.alias['@'] = path.join(process.cwd(), 'src'); 
    return config;
  },
};

export default nextConfig;
