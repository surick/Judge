import { ChatOptions, LLMProvider, getProviderForModel } from './index';
import { openaiProvider } from './openai';
import { anthropicProvider } from './anthropic';
import { deepseekProvider } from './deepseek';
import { qwenProvider } from './qwen';
import { Message } from '@/types';

const providers: Record<string, LLMProvider> = {
  openai: openaiProvider,
  anthropic: anthropicProvider,
  deepseek: deepseekProvider,
  qwen: qwenProvider,
};

export function getAvailableProviders(): string[] {
  return Object.entries(providers)
    .filter(([, provider]) => provider.isAvailable())
    .map(([name]) => name);
}

export function getProvider(name: string): LLMProvider | null {
  return providers[name] || null;
}

export async function streamChat(
  messages: Message[],
  options: ChatOptions
): Promise<ReadableStream<Uint8Array>> {
  const providerName = getProviderForModel(options.model);
  const provider = getProvider(providerName);

  if (!provider) {
    throw new Error(`Unknown provider for model: ${options.model}`);
  }

  if (!provider.isAvailable()) {
    throw new Error(`Provider ${providerName} is not available. Please check API key.`);
  }

  return provider.chat(messages, options);
}
