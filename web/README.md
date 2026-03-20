# Judge Web - AI 法律审判助手

基于 Next.js 14 的全栈 AI 法律咨询系统。

## 功能特性

- 🤖 **多模型支持** - OpenAI、Claude、DeepSeek、通义千问可切换
- ⚖️ **法律检索** - 自动检索相关法律条文
- 💬 **流式对话** - 类似 ChatGPT 的实时对话体验
- 📱 **响应式设计** - 支持各种屏幕尺寸

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local` 并填入 API Keys：

```bash
cp .env.example .env.local
```

需要配置至少一个 LLM 提供商的 API Key：

- `OPENAI_API_KEY` - OpenAI API Key
- `ANTHROPIC_API_KEY` - Anthropic API Key
- `DEEPSEEK_API_KEY` - DeepSeek API Key
- `QWEN_API_KEY` - 通义千问 API Key

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # 首页
│   ├── chat/page.tsx       # 对话页面
│   └── api/                # API 路由
│       ├── chat/route.ts   # 对话 API
│       ├── models/route.ts # 模型列表 API
│       └── laws/route.ts   # 法律检索 API
├── components/             # React 组件
├── lib/
│   ├── llm/               # LLM 集成
│   ├── laws/              # 法律检索
│   └── prompts/           # Prompt 模板
└── types/                 # TypeScript 类型定义
```

## 部署到 Vercel

### 1. 推送代码到 GitHub

```bash
git add web/
git commit -m "feat: add Next.js web application"
git push
```

### 2. 在 Vercel 导入项目

1. 访问 https://vercel.com/new
2. 选择你的 GitHub 仓库
3. 设置 Root Directory 为 `web`
4. 添加环境变量（API Keys）

### 3. 配置域名 evilcry.com

1. 在 Vercel 项目设置中添加域名 `evilcry.com`
2. 在域名 DNS 添加 CNAME 记录：
   ```
   CNAME  @  cname.vercel-dns.com
   ```

## 数据库配置（可选）

如果需要对话历史持久化：

1. 在 Vercel 创建 Postgres 数据库
2. 环境变量会自动配置
3. 运行数据库迁移：
   ```bash
   npx prisma db push
   ```

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **AI SDK**: Vercel AI SDK
- **数据库**: Prisma + PostgreSQL (可选)
- **类型检查**: TypeScript

## 注意事项

⚠️ 本系统仅供参考，不构成法律意见。重大法律问题请咨询专业律师。
