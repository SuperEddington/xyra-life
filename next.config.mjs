/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. 忽略构建报错（保留之前的配置）
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 2. 【核心新增】服务器端重定向
  // 这告诉 Vercel：只要有人访问根目录 /，直接把他扔到 /en 去
  // 不需要经过任何代码逻辑，简单粗暴有效。
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en', // 默认跳到英文版
        permanent: true,    // 这是一个永久跳转
      },
    ]
  },
};

export default nextConfig;
