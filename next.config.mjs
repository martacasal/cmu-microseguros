/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repoName = process.env.NEXT_PUBLIC_BASE_PATH || (isProd ? "/cmu-microseguros" : "");

const nextConfig = {
  output: "export",
  basePath: repoName,
  assetPrefix: repoName ? `${repoName}/` : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
