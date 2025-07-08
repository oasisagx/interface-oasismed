// API Types
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatResponse {
  message: string;
  suggestions?: string[];
}

// Dashboard Types
export interface DashboardMetric {
  title: string;
  value: string;
  trend: 'up' | 'down' | 'flat';
  change?: number;
  sparklineData?: number[];
}

export interface ChartDataPoint {
  month: string;
  consultas: number;
  procedimentos: number;
}

export interface DonutData {
  name: string;
  value: number;
  color: string;
}

// Prompt Types
export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'clinical' | 'diagnostic' | 'treatment' | 'general';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PromptCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  templates: PromptTemplate[];
}