export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  score: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type SortField = 'title' | 'priority' | 'score' | 'createdAt' | 'updatedAt';
export type SortDirection = 'asc' | 'desc';
export type FilterStatus = 'all' | 'active' | 'completed';
export type FilterPriority = 'all' | 'low' | 'medium' | 'high';