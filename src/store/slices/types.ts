import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export interface AuthState {
  accessToken?: string;
}

export interface ErrorState {
  error?: FetchBaseQueryError | SerializedError | null;
}

export interface BoardListState {
  boardList?: Board[] | null;
}
export interface BoardRequest {
  title: string;
  description: string;
  columns: Column[];
}
export interface Board extends BoardRequest {
  id: string;
}

export interface Column {
  id: string;
  title: string;
  order: number;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files: TaskFileItem[];
}

export interface TaskFileItem {
  filename: string;
  fileSize: number;
}

export interface LangState {
  lang: string;
}

export interface SearchState {
  searchValue: string;
}
