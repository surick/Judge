'use client';

import Link from 'next/link';
import { useInView } from '@/hooks/useInView';

/* ────────────────────────────────────────
   Scroll-reveal wrapper
   ──────────────────────────────────────── */
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isInView } = useInView(0.15);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ────────────────────────────────────────
   Navigation
   ──────────────────────────────────────── */
function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-[980px] mx-auto px-6 h-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-[#f5f5f7]">Judge</span>
        </Link>

        {/* Nav links */}
        <div className="hidden sm:flex items-center gap-6 text-xs text-[#86868b]">
          <a href="#features" className="hover:text-[#f5f5f7] transition-colors">特性</a>
          <a href="#examples" className="hover:text-[#f5f5f7] transition-colors">场景</a>
          <a href="#about" className="hover:text-[#f5f5f7] transition-colors">关于</a>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/surick/Judge"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[#86868b] hover:text-[#f5f5f7] transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          <Link
            href="/chat"
            className="text-xs font-medium text-[#f5f5f7] bg-[#0071e3] hover:bg-[#0077ed] px-4 py-1.5 rounded-full transition-colors"
          >
            开始使用
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ────────────────────────────────────────
   Hero Section (Dark)
   ──────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 text-center max-w-[720px] mx-auto px-6 pt-12">
        {/* Eyebrow */}
        <Reveal>
          <p className="text-[#86868b] text-lg mb-4">全新上线</p>
        </Reveal>

        {/* Title */}
        <Reveal delay={100}>
          <h1 className="text-[clamp(3rem,8vw,5.5rem)] font-semibold leading-[1.05] tracking-tight text-[#f5f5f7] mb-6">
            Judge.
          </h1>
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={200}>
          <p className="text-[clamp(1.2rem,2.5vw,1.6rem)] text-[#86868b] leading-relaxed mb-8 text-balance">
            AI 驱动的智能法律助手。<br className="hidden sm:block" />
            让每个人都能获得专业的法律分析。
          </p>
        </Reveal>

        {/* CTA */}
        <Reveal delay={300}>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/chat"
              className="text-lg font-medium text-[#2997ff] hover:underline underline-offset-4 inline-flex items-center gap-1.5"
            >
              开始免费咨询
              <span className="text-sm">&gt;</span>
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 border-[#424245] flex items-start justify-center p-1.5">
          <div className="w-1 h-2.5 bg-[#86868b] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   Feature Tile — full-width card
   ──────────────────────────────────────── */
function FeatureTile({
  title,
  subtitle,
  description,
  dark = false,
  children,
}: {
  title: string;
  subtitle: string;
  description: string;
  dark?: boolean;
  children?: React.ReactNode;
}) {
  const textColor = dark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]';
  const subColor = dark ? 'text-[#86868b]' : 'text-[#6e6e73]';
  const descColor = dark ? 'text-[#a1a1a6]' : 'text-[#86868b]';
  const bgColor = dark ? 'bg-[#101010]' : 'bg-[#f5f5f7]';

  return (
    <Reveal>
      <div className={`${bgColor} rounded-[28px] overflow-hidden`}>
        <div className="max-w-[720px] mx-auto text-center py-20 px-8">
          <p className={`text-sm ${subColor} mb-2`}>{subtitle}</p>
          <h2 className={`text-[clamp(2rem,5vw,3rem)] font-semibold leading-tight tracking-tight ${textColor} mb-4`}>
            {title}
          </h2>
          <p className={`text-lg ${descColor} max-w-lg mx-auto mb-6`}>
            {description}
          </p>
          {children}
        </div>
      </div>
    </Reveal>
  );
}

/* ────────────────────────────────────────
   Features Section
   ──────────────────────────────────────── */
function FeaturesSection() {
  return (
    <section id="features" className="bg-black py-3 px-3 sm:px-4 space-y-3">
      {/* Tile 1: 公正客观 */}
      <FeatureTile
        subtitle="公正分析"
        title="公正客观的法律判断。"
        description="基于法律条文进行分析，不受个人情感影响，给出客观中立的法律判断。"
        dark={false}
      >
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
          </div>
        </div>
      </FeatureTile>

      {/* Tile 2: 权威引用 */}
      <FeatureTile
        subtitle="权威依据"
        title="引用真实法律条文。"
        description="引用真实法律条文、司法解释和政府公文，所有依据可追溯、可验证。"
        dark={true}
      >
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mt-8">
          {['民法典', '消费者权益保护法', '劳动合同法'].map((law) => (
            <div key={law} className="bg-white/5 rounded-xl px-3 py-2 text-center">
              <span className="text-xs text-[#86868b]">{law}</span>
            </div>
          ))}
        </div>
      </FeatureTile>

      {/* Tile 3: 维权指引 */}
      <FeatureTile
        subtitle="行动指南"
        title="具体可行的维权路径。"
        description="提供具体可行的维权途径，包括投诉渠道、诉讼流程和注意事项。"
        dark={false}
      >
        <div className="flex items-center justify-center gap-3 mt-8">
          {[
            { step: '1', label: '描述问题' },
            { step: '2', label: 'AI 分析' },
            { step: '3', label: '获取建议' },
          ].map((item) => (
            <div key={item.step} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                {item.step}
              </div>
              <span className="text-sm text-[#6e6e73]">{item.label}</span>
            </div>
          ))}
        </div>
      </FeatureTile>
    </section>
  );
}

/* ────────────────────────────────────────
   Examples Section (Dark)
   ──────────────────────────────────────── */
function ExamplesSection() {
  const examples = [
    { icon: '🛒', question: '买到了过期食品，商家拒绝赔偿怎么办？', category: '消费者权益' },
    { icon: '💼', question: '公司拖欠工资三个月了，该如何维权？', category: '劳动纠纷' },
    { icon: '🏠', question: '租房合同到期房东不退押金，怎么处理？', category: '房屋租赁' },
    { icon: '📦', question: '网购商品与描述不符，能否要求退一赔三？', category: '电子商务' },
  ];

  return (
    <section id="examples" className="bg-black py-24 px-6">
      <div className="max-w-[980px] mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-[#86868b] text-sm mb-2">使用场景</p>
            <h2 className="text-[clamp(2rem,5vw,3rem)] font-semibold leading-tight tracking-tight text-[#f5f5f7] mb-4">
              你可以这样问。
            </h2>
            <p className="text-lg text-[#86868b] max-w-lg mx-auto">
              涵盖日常生活中的各类法律场景。
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-4">
          {examples.map((item, index) => (
            <Reveal key={index} delay={index * 100}>
              <Link
                href={`/chat?q=${encodeURIComponent(item.question)}`}
                className="group block bg-[#161617] hover:bg-[#1c1c1e] rounded-2xl p-6 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-white/10 transition-colors">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-[#6e6e73] mb-1.5 uppercase tracking-wider">{item.category}</div>
                    <p className="text-[#a1a1a6] group-hover:text-[#f5f5f7] transition-colors text-[15px] leading-relaxed">
                      {item.question}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-[#48484a] group-hover:text-[#f5f5f7] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   CTA Section (Light)
   ──────────────────────────────────────── */
function CTASection() {
  return (
    <section className="bg-[#f5f5f7] py-28 px-6">
      <div className="max-w-[720px] mx-auto text-center">
        <Reveal>
          <p className="text-[#6e6e73] text-sm mb-2">免费使用</p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight tracking-tight text-[#1d1d1f] mb-4">
            准备好了吗？
          </h2>
          <p className="text-lg text-[#6e6e73] mb-8 max-w-md mx-auto">
            免费使用，无需注册。立即获得专业的法律建议。
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 text-lg font-medium text-white bg-[#0071e3] hover:bg-[#0077ed] px-8 py-3.5 rounded-full transition-colors"
          >
            开始免费咨询
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   Footer (Apple-style)
   ──────────────────────────────────────── */
function Footer() {
  return (
    <footer id="about" className="bg-[#f5f5f7] border-t border-[#d2d2d7] py-6 px-6">
      <div className="max-w-[980px] mx-auto">
        {/* Disclaimer */}
        <div className="py-3 border-b border-[#d2d2d7] mb-4">
          <p className="text-xs text-[#6e6e73] leading-relaxed">
            ⚠️ 本系统仅供参考，不构成法律意见。重大法律问题请咨询专业律师。
          </p>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#6e6e73]">Copyright &copy; 2024 Judge. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/surick/Judge"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ────────────────────────────────────────
   Page
   ──────────────────────────────────────── */
export default function Home() {
  return (
    <main className="bg-black">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <ExamplesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
