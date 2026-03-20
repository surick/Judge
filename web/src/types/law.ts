export interface LawReference {
  id: string;
  name: string;          // 法律名称 (如: 《中华人民共和国民法典》)
  article: string;       // 条款号 (如: 第一千零二十四条)
  content: string;       // 条款内容
  source: string;        // 来源 (如: 国家法律法规数据库)
  url?: string;          // 原文链接
  relevanceScore?: number; // 相关度分数
}

export interface SearchResult {
  references: LawReference[];
  query: string;
  totalFound: number;
}

export interface LawSearchRequest {
  query: string;
  limit?: number;
  categories?: LawCategory[];
}

export type LawCategory =
  | 'civil'      // 民法
  | 'criminal'   // 刑法
  | 'administrative' // 行政法
  | 'labor'      // 劳动法
  | 'consumer'   // 消费者权益
  | 'contract'   // 合同法
  | 'property'   // 物权法
  | 'family'     // 婚姻家庭
  | 'traffic'    // 交通安全
  | 'other';
