import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Employee } from './employee';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptionsUsingUrlEncoded = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

const hhtpOptionsUsingFormData ={
  headers: new HttpHeaders({ 'enctype': 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA'})
}

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

  createEmployee(employee: Employee, file: File): Observable<Employee>{
    let bodyEncoded = new FormData();
    // let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("name", employee.name);
    bodyEncoded.append("email", employee.email);
    bodyEncoded.append("telephone", employee.telephone.toString());
    bodyEncoded.append("address", employee.address);
    bodyEncoded.append("job", employee.job);
    console.log("Comprobando el Contenido de Employee.File");
    console.log(employee);
    bodyEncoded.append("file", file);

    // const body = bodyEncoded.toString();
    console.log("Creating Employee...")
    console.log(JSON.stringify(employee))
    return this.httpClient.post<Employee>(this.endpoint, bodyEncoded, hhtpOptionsUsingFormData)
    .pipe(
      tap(employee => console.log('Employee created!')),
      catchError(this.handleError<Employee>('Error occured creating Employee'))
    );
  }

  modifyEmployee(employee: Employee,idEmployee: number, file: File): Observable<Employee>{
    let bodyEncoded = new FormData();
    // let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("name", employee.name);
    bodyEncoded.append("email", employee.email);
    bodyEncoded.append("telephone", employee.telephone.toString());
    bodyEncoded.append("address", employee.address);
    bodyEncoded.append("job", employee.job);
    console.log("Comprobando el Contenido de Employee.File");
    console.log(employee);
    bodyEncoded.append("file", file);

    // const body = bodyEncoded.toString();
    console.log("Modifying Employee...")
    console.log(JSON.stringify(employee))
    return this.httpClient.put<Employee>(this.endpoint + "/" + idEmployee, bodyEncoded, hhtpOptionsUsingFormData)
    .pipe(
      tap(_ => console.log('Employee was modified!')),
      catchError(this.handleError<Employee>('Modify Employee failed'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


}
