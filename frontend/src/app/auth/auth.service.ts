import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse } from './auth-response';
import { User } from './user';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER_ADDRESS: string = 'http://localhost:4000';

  constructor(private httpClient: HttpClient, private storage: Storage) { }

  private getOptions(user: User) {
    let base64UserAndPassword = window.btoa(user.username + ":" + user.password);

    let basicAccess = 'Basic ' + base64UserAndPassword;

    let options = {
      headers: {
        'Authorization': basicAccess,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
      //, withCredentials: true
    };
    console.log(options)
    return options;
  }

  register(user: User): Observable<AuthResponse> {
    console.log(user)
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("username", user.username);
    bodyEncoded.append("password", user.password);
    bodyEncoded.append("isAdmin", user.isAdmin.toString());
    bodyEncoded.append("darkMode", user.darkMode.toString());
    bodyEncoded.append("employeeId", user.employeeId.toString());
    console.log(user);
    const body = bodyEncoded.toString();

    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/users/`, body, this.getOptions(user)).pipe(
      tap(async (res: AuthResponse) => {
        if (res.user) {
          await this.storage.set("token", res.access_token);
        }
      })
    );
  }

  modify(user: User, id: Number, token: String): Observable<AuthResponse> {
    console.log("EMPEZAMOS A EDITAAAAAAAR")
    let bodyEncoded = new URLSearchParams();
    
    bodyEncoded.append("username", user.username);
    bodyEncoded.append("password", user.password);
    bodyEncoded.append("isAdmin", user.isAdmin.toString());
    bodyEncoded.append("darkMode", user.darkMode.toString());
    bodyEncoded.append("employeeId", user.employeeId.toString());
    console.log(user);
    const body = bodyEncoded.toString();
    return this.httpClient.put<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/users/` + id, body, this.getOptions(user)).pipe(
      tap(async (res: AuthResponse) => {
        if (res.user) {
          await this.storage.set("token", res.access_token);
        }
      })
    );
  }

  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/users/signin`, null, this.getOptions(user)).pipe(
      tap(async (res: AuthResponse) => {
      })
    );
  }

  async logout() {
    await this.storage.remove("token");
    await this.storage.remove("userId");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userToken");
  }

  async isLoggedIn() {
    // return this.authSubject.asObservable();
    let token = await this.storage.get("token");
    if (token) { //Just check if exists.
      return true;
    }
    return false;
  }


  async isAdmin(){
    let role = await this.storage.get("isAdmin");
    if(role = 1){
      return true;
    }
    return false;
  }
}
