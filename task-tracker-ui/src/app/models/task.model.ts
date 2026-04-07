export interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}

export interface PaginatedTasks {
  items: Task[];
  pagination: {
    page: number;
    limit: number;
    results: number;
  };
}

export interface ApiResponse<T> {
  status: 'success' | 'fail' | 'error';
  message: string;
  data: T;
}
