/** @type {import('next').NextConfig} */


const debug = process.env.NODE_ENV !== 'production';

const nextConfig = {
  swcMinify: true,

  images: {
    unoptimized: true,
  },

  basePath: !debug ? '/deepchem.github.io' : '',
  assetPrefix: !debug ? '/deepchem.github.io/' : '',

  eslint: {
    ignoreDuringBuilds: true,
  },


};

module.exports = nextConfig;
