import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user';
import { Storage } from '@ionic/storage';
import { AuthResponse } from 'src/app/auth/auth-response';

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
  AUTH_SERVER_ADDRESS: string = 'http://localhost:4000';

  constructor(private storage: Storage,private httpClient: HttpClient) { }

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

  getUserById(id, token): Observable<User>{
    console.log(token);
    let myOptions = this.getOptions(token);
    console.log(myOptions);
    return this.httpClient.get<User>(this.endpoint + "/" + id, myOptions);
  }

  // modifyUser(user: User, id: Number, token: String): Observable<User> {
  //   console.log("EMPEZAMOS A EDITAAAAAAAR")
  //   let bodyEncoded = new URLSearchParams();
    
  //   bodyEncoded.append("username", user.username);
  //   bodyEncoded.append("password", user.password);
  //   bodyEncoded.append("isAdmin", user.isAdmin.toString());
  //   bodyEncoded.append("darkMode", user.darkMode.toString());
  //   bodyEncoded.append("employeeId", user.employeeId.toString());
  //   console.log(user);
  //   const body = bodyEncoded.toString();
  //   return this.httpClient.put<User>(`${this.AUTH_SERVER_ADDRESS}/api/users/` + id, body, this.getOptions(user), token);
  // }
}
