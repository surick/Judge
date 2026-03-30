'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useChat } from 'ai/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { EXAMPLE_QUERIES } from '@/lib/prompts/judge';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Model {
  id: string;
  name: string;
  provider: string;
  description: string;
  available: boolean;
}

function ChatPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [, setIsLoadingModels] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    setMessages,
    setInput,
  } = useChat({
    api: '/api/chat',
    body: {
      model: selectedModel,
    },
  });

  // 初始化时如果有查询参数，设置输入
  useEffect(() => {
    if (initialQuery && !messages.length) {
      setInput(initialQuery);
    }
  }, [initialQuery, messages.length, setInput]);

  // 获取可用模型
  useEffect(() => {
    async function fetchModels() {
      try {
        const res = await fetch('/api/models');
        const data = await res.json();
        setModels(data.models || []);
        const firstAvailable = data.models?.find((m: Model) => m.available);
        if (firstAvailable) {
          setSelectedModel(firstAvailable.id);
        }
      } catch (err) {
        console.error('Failed to fetch models:', err);
      } finally {
        setIsLoadingModels(false);
      }
    }
    fetchModels();
  }, []);

  // 滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 自动调整输入框高度
  const adjustTextareaHeight = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 200) + 'px';
    }
  }, []);

  useEffect(() => {
    adjustTextareaHeight();
  }, [input, adjustTextareaHeight]);

  // 快捷键
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // 点击示例
  const handleExampleClick = (query: string) => {
    setInput(query);
    inputRef.current?.focus();
  };

  // 新对话
  const handleNewChat = () => {
    setMessages([]);
    setInput('');
  };

  const availableModels = models.filter(m => m.available);

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <aside
        className={cn(
          'flex flex-col bg-[#1d1d1f] transition-all duration-300 ease-out border-r border-white/5',
          sidebarOpen ? 'w-[280px]' : 'w-0 overflow-hidden'
        )}
      >
        {sidebarOpen && (
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-white/5">
              <Link href="/" className="flex items-center gap-3 mb-4 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <span className="text-xl font-semibold text-white">Judge</span>
              </Link>

              <button
                onClick={handleNewChat}
                className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex items-center gap-3 text-white/90 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
                <span className="font-medium">新对话</span>
              </button>
            </div>


            {/* Example Queries */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                示例问题
              </div>
              <div className="space-y-1">
                {EXAMPLE_QUERIES.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(query)}
                    className="w-full text-left px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors truncate"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-white/5">
              <div className="text-xs text-gray-500 text-center">
                ⚠️ 仅供参考，不构成法律意见
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={sidebarOpen ? "M11 19l-7-7 7-7m8 14l-7-7 7-7" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>

          <div className="flex items-center gap-3" />

          <Link
            href="/"
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Back to home"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </Link>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <WelcomeScreen onExampleClick={handleExampleClick} />
          ) : (
            <div className="max-w-3xl mx-auto py-8 px-4">
              {messages.map((message) => (
                <MessageItem
                  key={message.id}
                  message={message}
                />
              ))}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="py-6 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 my-4 text-red-400 text-sm animate-fade-in">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>发生错误: {error.message}</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 pt-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="relative glass rounded-2xl focus-within:border-blue-500/30 transition-colors">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="描述你的法律问题..."
                  rows={1}
                  className="w-full bg-transparent text-white rounded-2xl px-5 py-4 pr-14 resize-none focus:outline-none placeholder-gray-500 text-[16px] leading-relaxed max-h-[200px]"
                  disabled={isLoading || availableModels.length === 0}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim() || availableModels.length === 0}
                  className={cn(
                    'absolute right-3 bottom-3 w-9 h-9 rounded-xl flex items-center justify-center transition-all',
                    input.trim() && !isLoading
                      ? 'bg-white text-black hover:bg-gray-200'
                      : 'bg-white/10 text-gray-500 cursor-not-allowed'
                  )}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              按 Enter 发送，Shift + Enter 换行
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen bg-black items-center justify-center">
        <div className="flex items-center gap-2 text-gray-400">
          <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>加载中...</span>
        </div>
      </div>
    }>
      <ChatPageContent />
    </Suspense>
  );
}

function WelcomeScreen({ onExampleClick }: { onExampleClick: (query: string) => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-12 animate-fade-in-up">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
          <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold text-white mb-3">您好，有什么可以帮您？</h1>
        <p className="text-gray-400 text-lg">选择下方示例或直接输入您的法律问题</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 max-w-2xl w-full px-4">
        {EXAMPLE_QUERIES.map((query, index) => (
          <button
            key={index}
            onClick={() => onExampleClick(query)}
            className="card-glass text-left group animate-fade-in-up"
            style={{ animationDelay: `${0.1 * (index + 1)}s` }}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-gray-400 group-hover:text-white transition-colors text-sm leading-relaxed">
                {query}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function MessageItem({
  message,
}: {
  message: { id: string; role: string; content: string };
}) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="py-4 animate-fade-in-up">
        <div className="flex justify-end">
          <div className="bg-blue-500 rounded-2xl px-5 py-3 max-w-[85%]">
            <p className="text-white text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 animate-fade-in">
      <div className="flex gap-4">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        </div>
        <div className="flex-1 min-w-0 -mt-1">
          <div className="markdown">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
