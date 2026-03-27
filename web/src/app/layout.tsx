import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Judge - AI 法律审判助手',
  description: '基于大语言模型的智能法律咨询系统，提供公正的法律分析和维权建议',
  keywords: ['法律', 'AI', '审判', '咨询', '维权'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
