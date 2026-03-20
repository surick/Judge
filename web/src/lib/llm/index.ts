import { Message } from '@/types';

export interface ChatOptions {
  model: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

export interface LLMProvider {
  name: string;
  chat(messages: Message[], options: ChatOptions): Promise<ReadableStream<Uint8Array>>;
  isAvailable(): boolean;
}

export function getProviderForModel(modelId: string): string {
  if (modelId.startsWith('gpt')) return 'openai';
  if (modelId.startsWith('claude')) return 'anthropic';
  if (modelId.startsWith('deepseek')) return 'deepseek';
  if (modelId.startsWith('qwen')) return 'qwen';
  return 'unknown';
}

export function getModelConfig(modelId: string): { provider: string; model: string } {
  const provider = getProviderForModel(modelId);
  return { provider, model: modelId };
}
