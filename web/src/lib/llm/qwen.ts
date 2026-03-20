import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { Message } from '@/types';
import { ChatOptions, LLMProvider } from './index';

export class QwenProvider implements LLMProvider {
  name = 'qwen';

  private getClient() {
    const apiKey = process.env.QWEN_API_KEY;
    if (!apiKey) return null;
    return createOpenAI({
      apiKey,
      baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    });
  }

  isAvailable(): boolean {
    return !!process.env.QWEN_API_KEY;
  }

  async chat(messages: Message[], options: ChatOptions): Promise<ReadableStream<Uint8Array>> {
    const client = this.getClient();
    if (!client) {
      throw new Error('Qwen API key not configured');
    }

    const result = streamText({
      model: client(options.model),
      messages: messages.map(m => ({
        role: m.role,
        content: m.content,
      })),
      system: options.systemPrompt,
      temperature: options.temperature ?? 0.7,
      maxTokens: options.maxTokens ?? 4096,
    });

    return result.toDataStream();
  }
}

export const qwenProvider = new QwenProvider();
