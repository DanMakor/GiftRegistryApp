import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const apiUrl: string = "http://localhost:3000/api/";

export interface UserDetails {
  _id: string;
  name: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  name: string;
  password: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private token: string;
  private userSubject: BehaviorSubject<UserDetails>;

  constructor(
    private http: HttpClient, 
    private router: Router,
  ) {
    this.userSubject = new BehaviorSubject<UserDetails>(this.getUserDetails());
  }

  updateUser(user: UserDetails) {
    this.userSubject.next(user);
  }

  getUser(): Observable<UserDetails> {
    return this.userSubject.asObservable();
  }

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.updateUser(this.getUserDetails());
    this.router.navigateByUrl('/');
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post'|'get', type: 'login'|'register', user?: TokenPayload): Observable<any> {
    let base;
  
    if (method === 'post') {
      base = this.http.post(apiUrl + `${type}`, user);
    } else {
      base = this.http.get(apiUrl + `${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }
  
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
          this.updateUser(this.getUserDetails());
        }
        return data;
      })
    );
  
    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }
  
  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }
}