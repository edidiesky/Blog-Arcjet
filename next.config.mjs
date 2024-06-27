/** @type {import('next').NextConfig} */
import {withContentlayer} from 'next-contentlayer'
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "generated.vusercontent.net/"],
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        {
          loader: "next-mdx-remote/loader",
        },
      ],
    });

    return config;
  },
  compiler: {
    reactStrictMode: true,
    styledComponents: true,
  },
  rules: {
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off",
  },
};

export default withContentlayer(nextConfig);
