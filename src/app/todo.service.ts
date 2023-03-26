import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get(`${this.BASE_URL}/todos`);
  }

  getTodosByAuthorId(
    authorId: number,
    description?: string,
    priority?: string
  ) {
    let url = `${this.BASE_URL}/todos?authorId=${authorId}`;
    if (description) {
      url += `&description=${description}`;
    }
    if (priority) {
      url += `&priority=${priority}`;
    }
    return this.http.get(url);
  }

  createTodo(todo: any) {
    return this.http.post(`${this.BASE_URL}/todos`, todo);
  }

  updateTodo(id: number, todo: any) {
    return this.http.put(`${this.BASE_URL}/todos/${id}`, todo);
  }

  deleteTodo(id: number) {
    return this.http.delete(`${this.BASE_URL}/todos/${id}`);
  }
}
