/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // REF: https://nextjs.org/docs/pages/api-reference/components/image#dangerouslyallowsvg
    dangerouslyAllowSVG: true,
    // REF: https://nextjs.org/docs/messages/next-image-unconfigured-host
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    domains: ['cdn.dummyjson.com'],
  },

  // REF: https://nextjs.org/docs/pages/api-reference/next-config-js/redirects
  async redirects() {
    return [
      {
        source: '/',
        destination: '/products',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
