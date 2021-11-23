import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptionsUsingUrlEncoded = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  endpoint: string = "http://localhost:4000/api/employees";

  constructor(private httpClient: HttpClient) { }

  getAllEmployees(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(this.endpoint);
  }

  getEmployeeById(id: number): Observable<Employee>{
    return this.httpClient.get<Employee>(this.endpoint + "/" + id);
  }

  deleteEmployee(id: number): Observable<Employee>{
    return this.httpClient.delete<Employee>(this.endpoint + "/" + id);
  }

  // addEmployee(id: number, name: string, email: string, telephone: number, address: string, job: string): Observable<Employee>{
  //   return this.httpClient.post<Employee>(this.endpoint);
  // }

  // modifyEmployee(id: number): Observable<Employee>{
  //   return this.httpClient.put<Employee>(this.endpoint + "/" + id);
  // }

}
