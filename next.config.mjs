/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.NODE_ENV !== 'production' && {
    cacheMaxMemorySize: 0,
  }),
  compiler: {
    emotion: {
      sourceMap: true,
      autoLabel: 'dev-only',
      labelFormat: '[local]',
    },
  },
}

export default nextConfig
