import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyModel } from '../api/company';
import { LocalStorageLoginService } from './local-storage-login.service';

const apiUrl = 'http://127.0.0.1:8000/api/auth/companies/filter';

@Injectable({
  providedIn: 'root'
})
export class CategoryFilterService {

  constructor(
    private http: HttpClient,
    public localStorage: LocalStorageLoginService,
  ) { }

  filter(term: string): Observable<CompanyModel[]> {
    const token = this.localStorage.get("token");
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.get<CompanyModel[]>(`${apiUrl}?category=${term}`, options)
  }
}
