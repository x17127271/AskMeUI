import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}
  private apiBaseUrl = 'http://localhost:51044/api';
  getAll() {
    return this.http.get<User[]>(`${this.apiBaseUrl}/users`);
  }

  register(user: User) {
    return this.http.post(`${this.apiBaseUrl}/users/register`, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiBaseUrl}/users/${id}`);
  }
}
