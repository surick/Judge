# Judge - AI 智能法律顾问

一个基于大语言模型的智能法律咨询系统，为您提供专业、客观的法律分析和维权建议。

## 功能特点

- **多模型支持** - 可切换使用 OpenAI、Claude、DeepSeek、通义千问等主流大模型
- **权威引用** - 引用真实法律条文，提供可追溯的法律依据
- **维权指引** - 给出具体可行的维权途径和操作建议
- **现代界面** - 简洁优雅的对话式交互，支持流式输出
- **一键部署** - 支持 Vercel 平台快速部署

## 快速开始

### 环境要求

- Node.js 18+
- npm 或 pnpm

### 安装步骤

```bash
# 克隆项目
git clone https://github.com/your-username/judge.git
cd judge

# 安装依赖
cd web && npm install

# 配置环境变量
cp .env.example .env.local
```

### 配置 API Key

编辑 `.env.local` 文件，填入至少一个 LLM API Key：

```env
# 选择一个或多个
OPENAI_API_KEY=sk-xxx
ANTHROPIC_API_KEY=sk-ant-xxx
DEEPSEEK_API_KEY=sk-xxx
QWEN_API_KEY=sk-xxx
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 开始使用。

## 项目结构

```
judge/
├── web/                    # Next.js 全栈应用
│   ├── src/
│   │   ├── app/           # 页面和 API 路由
│   │   ├── lib/           # 核心业务逻辑
│   │   │   ├── llm/       # 多模型 LLM 网关
│   │   │   ├── laws/      # 法律检索
│   │   │   └── prompts/   # Prompt 模板
│   │   └── types/         # TypeScript 类型定义
│   └── prisma/            # 数据库 Schema
│
└── kernel/                 # Java 原型（已废弃）
```

## 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 Vercel 导入项目，设置 Root Directory 为 `web`
3. 配置环境变量（API Keys）
4. 部署完成后绑定自定义域名

## 技术栈

- **前端**: Next.js 14 + React + Tailwind CSS
- **后端**: Next.js API Routes
- **AI**: Vercel AI SDK + 多模型适配
- **数据库**: Prisma + PostgreSQL（可选）

## 免责声明

⚠️ 本系统仅供参考，不构成法律意见。重大法律问题请咨询专业律师。

## License

MIT
