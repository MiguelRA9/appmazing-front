import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    const url = "http://localhost:30030/categories/getAll";
    const headers = new HttpHeaders();
    return this.http.get<any>(url, {headers});
  }

  getCategory(category_id: number): Observable<any>{
    const url = 'http://localhost:30030/categories/get';
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    const body = JSON.stringify({id: category_id});
    return this.http.post(url, body, {headers});
  }

  newCategory(category: any): void {
    const url = 'http://localhost:30030/categories/add';
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    const body = category;
    this.http.post(url, body, {headers}).subscribe();
  }

  updateCategory(category: any): void {
    const url = 'http://localhost:30030/categories/update';
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    const body = category;
    this.http.put(url, body, {headers}).subscribe();
  }
}
