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

export interface BoardState {
  board?: Board | null;
}

export interface ColumnRequest {
  title: string;
  order: number;
}

export interface Column extends ColumnRequest {
  id: string;
  tasks: TaskResponse[];
}

export interface ColumnResponseAll {
  id: string;
  title: string;
  order: number;
}

export interface ColumnListState {
  [id: string]: ColumnResponseAll[] | null;
}
export interface ColumnState {
  column?: ColumnResponseAll | null;
}

export interface TaskFormData {
  title: string;
  description: string;
  done: boolean;
}

export interface TaskRequest {
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}
export interface TaskResponse extends TaskRequest {
  id: string;
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
