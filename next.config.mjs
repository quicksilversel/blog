/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.NODE_ENV !== 'production' && {
    cacheMaxMemorySize: 0,
  }),

  compiler: {
    emotion: {
      sourceMap: process.env.NODE_ENV !== 'production',
      autoLabel: 'dev-only',
      labelFormat: '[local]',
      importMap: {
        '@emotion/react': {
          styled: {
            canonicalImport: ['@emotion/styled', 'default'],
          },
        },
      },
    },
  },

  experimental: {
    turbo: {
      resolveAlias: {
        '@/*': ['./src/*'],
      },
    },
  },

  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            emotion: {
              name: 'emotion',
              test: /[\\/]node_modules[\\/]@emotion[\\/]/,
              chunks: 'all',
              priority: 30,
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      }

      config.resolve = {
        ...config.resolve,
        symlinks: false,
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
      }

      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      }

      config.watchOptions = {
        ignored: ['**/node_modules', '**/.git', '**/.next'],
      }
    }

    return config
  },

  transpilePackages: ['next-mdx-remote'],
}

export default nextConfig
