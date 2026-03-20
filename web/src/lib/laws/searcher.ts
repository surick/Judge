import { LawReference, SearchResult, LawSearchRequest } from '@/types/law';

export interface LawSource {
  name: string;
  search(query: string, limit?: number): Promise<LawReference[]>;
  isAvailable(): boolean;
}

// 简单的关键词提取（实际项目中可以使用更复杂的NLP）
function extractKeywords(query: string): string[] {
  // 移除常见停用词
  const stopWords = new Set(['的', '了', '是', '在', '我', '有', '和', '就', '不', '人', '都', '一', '一个', '上', '也', '很', '到', '说', '要', '去', '你', '会', '着', '没有', '看', '好', '自己', '这']);

  const words = query
    .replace(/[？?！!。，,、]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 1 && !stopWords.has(word));

  return Array.from(new Set(words));
}

// 预置的法律数据库（示例数据）
const LAW_DATABASE: LawReference[] = [
  // 消费者权益保护
  {
    id: '1',
    name: '中华人民共和国消费者权益保护法',
    article: '第五十五条',
    content: '经营者提供商品或者服务有欺诈行为的，应当按照消费者的要求增加赔偿其受到的损失，增加赔偿的金额为消费者购买商品的价款或者接受服务的费用的三倍；增加赔偿的金额不足五百元的，为五百元。',
    source: '国家法律法规数据库',
    url: 'https://flk.npc.gov.cn/detail2.html?ZmY4MDgxODE3OTZkMWFlYzAxNzlkNzEzYTIwNzA0YjQ%3D',
  },
  {
    id: '2',
    name: '中华人民共和国消费者权益保护法',
    article: '第四十九条',
    content: '经营者提供商品或者服务，造成消费者或者其他受害人人身伤害的，应当赔偿医疗费、护理费、交通费等为治疗和康复支出的合理费用，以及因误工减少的收入。',
    source: '国家法律法规数据库',
  },
  {
    id: '3',
    name: '中华人民共和国食品安全法',
    article: '第一百四十八条',
    content: '生产不符合食品安全标准的食品或者经营明知是不符合食品安全标准的食品，消费者除要求赔偿损失外，还可以向生产者或者经营者要求支付价款十倍或者损失三倍的赔偿金；增加赔偿的金额不足一千元的，为一千元。',
    source: '国家法律法规数据库',
  },
  // 劳动法
  {
    id: '4',
    name: '中华人民共和国劳动法',
    article: '第五十条',
    content: '工资应当以货币形式按月支付给劳动者本人。不得克扣或者无故拖欠劳动者的工资。',
    source: '国家法律法规数据库',
  },
  {
    id: '5',
    name: '中华人民共和国劳动合同法',
    article: '第八十五条',
    content: '用人单位有下列情形之一的，由劳动行政部门责令限期支付劳动报酬、加班费或者经济补偿；劳动报酬低于当地最低工资标准的，应当支付其差额部分；逾期不支付的，责令用人单位按应付金额百分之五十以上百分之一百以下的标准向劳动者加付赔偿金。',
    source: '国家法律法规数据库',
  },
  {
    id: '6',
    name: '中华人民共和国劳动合同法',
    article: '第四十七条',
    content: '经济补偿按劳动者在本单位工作的年限，每满一年支付一个月工资的标准向劳动者支付。六个月以上不满一年的，按一年计算；不满六个月的，向劳动者支付半个月工资的经济补偿。',
    source: '国家法律法规数据库',
  },
  // 民法典
  {
    id: '7',
    name: '中华人民共和国民法典',
    article: '第七百零三条',
    content: '租赁合同是出租人将租赁物交付承租人使用、收益，承租人支付租金的合同。',
    source: '国家法律法规数据库',
  },
  {
    id: '8',
    name: '中华人民共和国民法典',
    article: '第五百七十七条',
    content: '当事人一方不履行合同义务或者履行合同义务不符合约定的，应当承担继续履行、采取补救措施或者赔偿损失等违约责任。',
    source: '国家法律法规数据库',
  },
  {
    id: '9',
    name: '中华人民共和国民法典',
    article: '第一千一百六十五条',
    content: '行为人因过错侵害他人民事权益造成损害的，应当承担侵权责任。',
    source: '国家法律法规数据库',
  },
  // 噪音污染
  {
    id: '10',
    name: '中华人民共和国噪声污染防治法',
    article: '第六十六条',
    content: '对已竣工交付使用的住宅楼进行室内装修活动，应当按照规定限定作业时间，采取有效措施，防止、减轻噪声污染。',
    source: '国家法律法规数据库',
  },
];

// 计算相关度分数（简单实现）
function calculateRelevance(query: string, law: LawReference): number {
  const keywords = extractKeywords(query);
  const lawText = `${law.name} ${law.article} ${law.content}`.toLowerCase();

  let score = 0;
  for (const keyword of keywords) {
    if (lawText.includes(keyword.toLowerCase())) {
      score += 1;
    }
  }

  // 精确匹配法律名称加分
  if (law.name.includes('消费者') && (query.includes('消费') || query.includes('买到') || query.includes('网购'))) {
    score += 3;
  }
  if (law.name.includes('劳动') && (query.includes('工资') || query.includes('辞退') || query.includes('公司'))) {
    score += 3;
  }
  if (law.name.includes('食品') && (query.includes('食品') || query.includes('过期'))) {
    score += 3;
  }
  if (law.name.includes('租赁') || law.name.includes('民法典')) {
    if (query.includes('租房') || query.includes('房东') || query.includes('押金')) {
      score += 3;
    }
  }
  if (law.name.includes('噪声') && (query.includes('噪音') || query.includes('装修'))) {
    score += 3;
  }

  return score;
}

export async function searchLaws(request: LawSearchRequest): Promise<SearchResult> {
  const { query, limit = 5 } = request;

  // 计算相关度并排序
  const results = LAW_DATABASE
    .map(law => ({
      ...law,
      relevanceScore: calculateRelevance(query, law),
    }))
    .filter(law => law.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);

  return {
    references: results,
    query,
    totalFound: results.length,
  };
}

export function formatLawContext(references: LawReference[]): string {
  return references
    .map((ref, index) => `[${index + 1}] **${ref.name}** ${ref.article}\n${ref.content}`)
    .join('\n\n');
}
