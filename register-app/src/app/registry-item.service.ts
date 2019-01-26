import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RegistryItem } from '../app/registry-item';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { AuthenticationService } from './authentication-service.service';
import { Category } from './category';

const apiUrl: string = "http://ec2-52-14-82-165.us-east-2.compute.amazonaws.com/api/";
// const apiUrl: string = "http://localhost:3000/api/";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  }),
  category: String
}

@Injectable({
  providedIn: 'root'
})
export class RegistryItemService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(apiUrl + "categories", { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
  }

  getRegistryItems(): Observable<RegistryItem[]> {
    return this.http.get<RegistryItem[]>(apiUrl + "registry-items", { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(apiUrl + "categories/add", category, httpOptions);
  }

  addRegistryItem(registerItem: RegistryItem): Observable<RegistryItem> {
    return this.http.post<RegistryItem>(apiUrl + "registry-items/add", registerItem, httpOptions);
  }

  updateRegistryItem(registerItem: RegistryItem): Observable<RegistryItem> {
    return this.http.put<RegistryItem>(apiUrl + "registry-items/update", registerItem, httpOptions);
  }
}

