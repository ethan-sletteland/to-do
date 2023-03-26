import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.BASE_URL}/users`);
  }

  getUsersById(id: number) {
    return this.http.get(`${this.BASE_URL}/users/${id}`);
  }

  createUser(user: any) {
    return this.http.post(`${this.BASE_URL}/users`, user);
  }

  updateUser(id: number, user: any) {
    return this.http.put(`${this.BASE_URL}/users/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.BASE_URL}/users/${id}`);
  }
}
