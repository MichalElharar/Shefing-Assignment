import { Injectable } from '@angular/core';
import { Post } from '../Models/Post';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  BASE_URL = "https://jsonplaceholder.typicode.com/";
  displayIndicator: boolean = false;
  constructor() { }

  async getUsers() {
    try {
    this.displayIndicator = true;
      const response = await fetch(this.BASE_URL + 'users');
      return this.handleResponse(response);
    } catch (error) {
      alert('Fetch ' + error);
    }
  }

  async getUserPosts(userId?: number) {
    try {
      this.displayIndicator = true;
      const response = await fetch(this.BASE_URL + 'posts?userId=' + userId);
      return this.handleResponse(response);
    } catch (error) {
      alert('Fetch ' + error);
    }
  }

  async addUserPost(post: Post) {
    try {
      this.displayIndicator = true;
      const response = await fetch(this.BASE_URL + 'posts', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      return this.handleResponse(response);
    } catch (error) {
      alert('Fetch ' + error);
    }
  }

  private handleResponse(response: Response) {
    this.displayIndicator = false;
    if (response.ok) {
      return response.json();
    } else {
      // Custom message for failed HTTP codes
      if (response.status === 404) throw new Error('404, Not found');
      if (response.status === 500) throw new Error('500, internal server error');
      // For any other server error
      throw new Error(response.status.toString());
    }
  }
}
