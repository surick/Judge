import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import { Message } from '@/types';
import { ChatOptions, LLMProvider } from './index';

export class AnthropicProvider implements LLMProvider {
  name = 'anthropic';

  private getClient() {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return null;
    return anthropic;
  }

  isAvailable(): boolean {
    return !!process.env.ANTHROPIC_API_KEY;
  }

  async chat(messages: Message[], options: ChatOptions): Promise<ReadableStream<Uint8Array>> {
    const client = this.getClient();
    if (!client) {
      throw new Error('Anthropic API key not configured');
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

export const anthropicProvider = new AnthropicProvider();
