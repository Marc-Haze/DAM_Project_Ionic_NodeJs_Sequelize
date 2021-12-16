import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';
import { Maintenance } from './maintenance';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptionsUsingUrlEncoded = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable({
  providedIn: 'root'
})
export class MaintenancesService {

  endpoint: string = "http://localhost:4000/api/maintenances";

  constructor(private httpClient: HttpClient) { }

  getAllMaintenances(): Observable<Maintenance[]>{
    return this.httpClient.get<Maintenance[]>(this.endpoint);
  }

  getMaintenanceById(id: number): Observable<Maintenance>{
    return this.httpClient.get<Maintenance>(this.endpoint + "/" + id);
  }

  getMatchedMaintenances(employeeId: number): Observable<Maintenance[]>{
    console.log("LLEGAMOS HASTA LA PUERTA DE SALIDA")
    console.log("EL ID DE EMPLEADO ES: ",employeeId)
    return this.httpClient.get<Maintenance[]>(this.endpoint + "/" + employeeId);
  }

  deleteMaintenance(id: number): Observable<Maintenance>{
    return this.httpClient.delete<Maintenance>(this.endpoint + "/" + id);
  }

  createMaintenance(maintenance: Maintenance): Observable<Maintenance>{
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("service", maintenance.service);
    bodyEncoded.append("state", maintenance.state);
    bodyEncoded.append("description", maintenance.description);
    bodyEncoded.append("dock", maintenance.dock);
    bodyEncoded.append("note", maintenance.note);
    bodyEncoded.append("employeeId", maintenance.employeeId.toString());
    bodyEncoded.append("shipId", maintenance.shipId.toString());

    const body = bodyEncoded.toString();
    console.log("Creating Maintenance...")
    console.log(JSON.stringify(maintenance))
    return this.httpClient.post<Maintenance>(this.endpoint, body, httpOptionsUsingUrlEncoded)
    .pipe(
      tap(maintenance => console.log('Maintenance created!')),
      catchError(this.handleError<Maintenance>('Error occured creating Maintenance'))
    );
  }

  modifyMaintenance(maintenance: Maintenance, idMaintenance: number): Observable<Maintenance>{
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("service", maintenance.service);
    bodyEncoded.append("state", maintenance.state);
    bodyEncoded.append("description", maintenance.description);
    bodyEncoded.append("dock", maintenance.dock);
    bodyEncoded.append("note", maintenance.note);
    bodyEncoded.append("employeeId", maintenance.employeeId.toString());
    bodyEncoded.append("shipId", maintenance.shipId.toString());

    const body = bodyEncoded.toString();
    console.log("Modifying Maintenance...")
    console.log(JSON.stringify(maintenance))
    return this.httpClient.put<Maintenance>(this.endpoint + "/" + idMaintenance, body, httpOptionsUsingUrlEncoded)
    .pipe(
      tap(_ => console.log('Maintenance was modified!')),
      catchError(this.handleError<Maintenance>('Modify Maintenance failed'))
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
