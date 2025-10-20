import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Task {
  id: number;
  task_title: string;
  task_status: 'pending' | 'done';
}

export interface Todo {
  id: number;
  todo_title: string;
  tasks?: Task[];
}

export interface CreateTodoData {
  todo_title: string;
}

export interface UpdateTodoData {
  todo_title?: string;
}

export interface CreateTaskData {
  task_title: string;
  task_status: 'pending' | 'done';
  todo_id: number;
}

export interface UpdateTaskData {
  task_title?: string;
  task_status?: 'pending' | 'done';
}

export const todosApi = {
  getAll: async (): Promise<Todo[]> => {
    const response = await api.get<Todo[]>('/todos');
    return response.data;
  },

  getById: async (id: number): Promise<Todo> => {
    const response = await api.get<Todo>(`/todos/${id}`);
    return response.data;
  },

  create: async (data: CreateTodoData): Promise<Todo> => {
    const response = await api.post<Todo>('/todos', { todo: data });
    return response.data;
  },

  update: async (id: number, data: UpdateTodoData): Promise<Todo> => {
    const response = await api.put<Todo>(`/todos/${id}`, { todo: data });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },
};

export const tasksApi = {
  getAll: async (todoId: number): Promise<Task[]> => {
    const response = await api.get<Task[]>(`/todos/${todoId}/tasks`);
    return response.data;
  },

  getById: async (todoId: number, id: number): Promise<Task> => {
    const response = await api.get<Task>(`/todos/${todoId}/tasks/${id}`);
    return response.data;
  },

  create: async (data: CreateTaskData): Promise<Task> => {
    const response = await api.post<Task>(`/todos/${data.todo_id}/tasks`, { task: data });
    return response.data;
  },

  update: async (todoId: number, id: number, data: UpdateTaskData): Promise<Task> => {
    const response = await api.put<Task>(`/todos/${todoId}/tasks/${id}`, { task: data });
    return response.data;
  },

  delete: async (todoId: number, id: number): Promise<void> => {
    await api.delete(`/todos/${todoId}/tasks/${id}`);
  },
};

export default api;
