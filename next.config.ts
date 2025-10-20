import type { NextConfig } from 'next';
import { env } from './src/env';

const nextConfig: NextConfig = {
    output: 'standalone',
    i18n: {
        locales: ['en-US', 'zh-CN'],
        defaultLocale: 'zh-CN',
    },
    webpack: config => {
        config.module.rules.push({
            test: /\.svg$/,
            use: [{ loader: '@svgr/webpack', options: { dimensions: false } }],
        });
        return config;
    },
    rewrites: async () => [
        {
            source: '/docs/:path*',
            destination: env.SPARK_DOCS_URL + '/:path*',
        },
        {
            source: '/thumb/:slug',
            destination: env.SPARK_THUMBNAIL_SERVICE_URL + '/:slug',
        },
        {
            source: '/:slug',
            has: [{ type: 'query', key: 'raw' }],
            destination: env.SPARK_JSON_SERVICE_URL + '/:slug',
        },
    ],
};

export default nextConfig;
