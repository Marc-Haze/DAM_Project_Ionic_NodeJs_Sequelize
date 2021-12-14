import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user';

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
export class UsersService {

  endpoint: string = "http://localhost:4000/api/users";

  constructor(private httpClient: HttpClient) { }

  private getOptions(token){

    let bearerAccess = 'Bearer ' + token;

    let options = {
      headers: {
        'Authorization' : bearerAccess,
        // 'Content-Type' : 'application/x-www-form-urlencoded',
      }
      //, withCredentials: true
    };

    return options;
  }

  getAllUsers(token): Observable<User[]>{
    console.log(token);
    let myOptions = this.getOptions(token);
    console.log(myOptions);
    return this.httpClient.get<User[]>(this.endpoint, myOptions);
  }

  deleteUser(id: number): Observable<User>{
    return this.httpClient.delete<User>(this.endpoint + "/" + id);
  }

  createUser(user: User, file: File): Observable<User>{
    let bodyEncoded = new FormData();
    // let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("username", user.username);
    bodyEncoded.append("password", user.password);
    bodyEncoded.append("isAdmin", user.isAdmin.toString());
    bodyEncoded.append("darkMode", user.darkMode.toString());
    console.log("Comprobando el Contenido de User.File");
    console.log(user);
    bodyEncoded.append("file", file);

    // const body = bodyEncoded.toString();
    console.log("Creating User...")
    console.log(JSON.stringify(user))
    return this.httpClient.post<User>(this.endpoint, bodyEncoded, hhtpOptionsUsingFormData)
    .pipe(
      tap(employee => console.log('User created!')),
      catchError(this.handleError<User>('Error occured creating User'))
    );
  }

  modifyEmployee(user: User, idUser: number, file: File): Observable<User>{
    let bodyEncoded = new FormData();
    // let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("username", user.username);
    bodyEncoded.append("password", user.password);
    bodyEncoded.append("isAdmin", user.isAdmin.toString());
    bodyEncoded.append("darkMode", user.darkMode.toString());
    console.log("Comprobando el Contenido de User.File");
    console.log(user);
    bodyEncoded.append("file", file);

    // const body = bodyEncoded.toString();
    console.log("Modifying User...")
    console.log(JSON.stringify(user))
    return this.httpClient.put<User>(this.endpoint + "/" + idUser, bodyEncoded, hhtpOptionsUsingFormData)
    .pipe(
      tap(_ => console.log('User was modified!')),
      catchError(this.handleError<User>('Modify User failed'))
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
