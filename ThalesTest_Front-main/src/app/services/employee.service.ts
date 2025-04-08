import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  headers = new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  })
  private apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  public getEmployeeById(data: any): Observable<any> {
    return this.httpClient.post(
      this.apiUrl + 'Employees/GetEmployeeById',
      data
    );
  }

  public getAllEmployees(data:any): Observable<any> {
    return this.httpClient.post(
      this.apiUrl + 'Employees/GetAllEmployees',
      data, {headers: this.headers}
    );
  }
}
