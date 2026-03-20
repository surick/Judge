import { streamChat } from '@/lib/llm/providers';
import { searchLaws, formatLawContext } from '@/lib/laws/searcher';
import { buildJudgePrompt } from '@/lib/prompts/judge';
import { Message } from '@/types';
import { AVAILABLE_MODELS } from '@/types/model';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, model } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Messages are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!model) {
      return new Response(JSON.stringify({ error: 'Model is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 检查模型是否可用
    const modelConfig = AVAILABLE_MODELS.find(m => m.id === model);
    if (!modelConfig) {
      return new Response(JSON.stringify({ error: 'Invalid model' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 获取最后一条用户消息
    const lastUserMessage = [...messages].reverse().find((m: Message) => m.role === 'user');
    let lawContext = '';

    // 搜索相关法律
    if (lastUserMessage) {
      try {
        const searchResult = await searchLaws({
          query: lastUserMessage.content,
          limit: 5,
        });

        if (searchResult.references.length > 0) {
          lawContext = formatLawContext(searchResult.references);
        }
      } catch (error) {
        console.error('Law search error:', error);
        // 继续执行，即使法律搜索失败
      }
    }

    // 构建 system prompt
    const systemPrompt = buildJudgePrompt(lastUserMessage?.content || '', lawContext);

    // 转换消息格式
    const formattedMessages: Message[] = messages.map((m: Message) => ({
      id: m.id || crypto.randomUUID(),
      role: m.role,
      content: m.content,
      createdAt: new Date(),
    }));

    // 调用 LLM
    const stream = await streamChat(formattedMessages, {
      model,
      systemPrompt,
      temperature: 0.7,
      maxTokens: 4096,
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal server error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
