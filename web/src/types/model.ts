export type ModelProvider = 'openai' | 'anthropic' | 'deepseek' | 'qwen';

export interface Model {
  id: string;
  name: string;
  provider: ModelProvider;
  description: string;
  maxTokens: number;
  available: boolean;
}

export interface ModelConfig {
  provider: ModelProvider;
  apiKey: string;
  baseUrl?: string;
}

export const AVAILABLE_MODELS: Model[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'openai',
    description: 'OpenAI 最新旗舰模型，综合能力最强',
    maxTokens: 128000,
    available: false,
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'openai',
    description: 'GPT-4 增强版，速度更快',
    maxTokens: 128000,
    available: false,
  },
  {
    id: 'claude-3-5-sonnet-20241022',
    name: 'Claude 3.5 Sonnet',
    provider: 'anthropic',
    description: 'Anthropic 最新模型，推理能力强',
    maxTokens: 200000,
    available: false,
  },
  {
    id: 'deepseek-chat',
    name: 'DeepSeek',
    provider: 'deepseek',
    description: '国产优秀模型，中文能力强',
    maxTokens: 64000,
    available: false,
  },
  {
    id: 'qwen-max',
    name: '通义千问 Max',
    provider: 'qwen',
    description: '阿里云旗舰模型，法律知识丰富',
    maxTokens: 32000,
    available: false,
  },
];
