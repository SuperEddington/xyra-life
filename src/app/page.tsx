import { redirect } from 'next/navigation'

// 这个文件的作用是：当用户访问根域名 (xyra-life.vercel.app) 时
// 直接强制跳转到默认语言 (比如英语 /en)
export default function RootPage() {
  redirect('/en')
}
