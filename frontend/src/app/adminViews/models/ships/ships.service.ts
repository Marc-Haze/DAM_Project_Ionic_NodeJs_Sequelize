import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';
import { Ship } from './ship';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptionsUsingUrlEncoded = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable({
  providedIn: 'root'
})
export class ShipsService {

  endpoint: string = "http://localhost:4000/api/ships";

  constructor(private httpClient: HttpClient) { }

  getAllShips(): Observable<Ship[]>{
    return this.httpClient.get<Ship[]>(this.endpoint);
  }

  getShipById(id: number): Observable<Ship>{
    return this.httpClient.get<Ship>(this.endpoint + "/" + id);
  }

  deleteShip(id: number): Observable<Ship>{
    return this.httpClient.delete<Ship>(this.endpoint + "/" + id);
  }

  createShip(ship: Ship): Observable<Ship>{
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("name", ship.name);
    bodyEncoded.append("type", ship.type);
    bodyEncoded.append("client", ship.client);

    const body = bodyEncoded.toString();
    console.log("Creating Ship...")
    console.log(JSON.stringify(ship))
    return this.httpClient.post<Ship>(this.endpoint, body, httpOptionsUsingUrlEncoded)
    .pipe(
      tap(employee => console.log('Ship created!')),
      catchError(this.handleError<Ship>('Error occured creating Ship'))
    );
  }

  modifyShip(ship: Ship, idShip: number): Observable<Ship>{
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("name", ship.name);
    bodyEncoded.append("type", ship.type);
    bodyEncoded.append("client", ship.client);

    const body = bodyEncoded.toString();
    console.log("Modifying Ship...")
    console.log(JSON.stringify(ship))
    return this.httpClient.put<Ship>(this.endpoint + "/" + idShip, body, httpOptionsUsingUrlEncoded)
    .pipe(
      tap(_ => console.log('Ship was modified!')),
      catchError(this.handleError<Ship>('Modify Ship failed'))
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
