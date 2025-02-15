import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo.types';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl = "http://localhost:8080/todos";
  httpClient = inject(HttpClient);

  constructor() { }

  retrieveAllTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.baseUrl);
  }

  saveTodo(title: string | null | undefined, dueBy: Date | null | undefined): Observable<void> {
    return this.httpClient.post<void>(this.baseUrl, { title, dueBy })
  }

  updateTodo(id: number | undefined, complete: boolean): Observable<void> {
    return this.httpClient.put<void>(this.baseUrl + `/${id}`, { complete });
  }
}
