import { AVAILABLE_MODELS } from '@/types/model';
import { getAvailableProviders, getProvider } from '@/lib/llm/providers';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const availableProviders = getAvailableProviders();

  const models = AVAILABLE_MODELS.map(model => ({
    ...model,
    available: availableProviders.includes(model.provider),
  }));

  return NextResponse.json({
    models,
    availableProviders,
  });
}
