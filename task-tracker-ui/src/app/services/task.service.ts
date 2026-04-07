import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task, ApiResponse, PaginatedTasks } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly apiUrl = 'https://axis-api-three.vercel.app/api/v1/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http
      .get<ApiResponse<PaginatedTasks>>(this.apiUrl)
      .pipe(map((res) => res.data.items));
  }

  addTask(title: string): Observable<Task> {
    return this.http
      .post<ApiResponse<Task>>(this.apiUrl, { title })
      .pipe(map((res) => res.data));
  }

  deleteTask(id: string): Observable<Task> {
    return this.http
      .delete<ApiResponse<Task>>(`${this.apiUrl}/${id}`)
      .pipe(map((res) => res.data));
  }

  updateTask(id: string, completed: boolean): Observable<Task> {
    return this.http
      .patch<ApiResponse<Task>>(`${this.apiUrl}/${id}`, { completed })
      .pipe(map((res) => res.data));
  }
}
