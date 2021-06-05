import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string;
  baseUrl = 'http://localhost:8888/MoutteCAPI/backend/api/partner';
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor( private httpClient: HttpClient) { }
  public userlogin(usernamePartner: any, password: any): any {
    return this.httpClient.post<any>(this.baseUrl + '/loginPartner.php', { usernamePartner, password})
    .pipe(map(Partners  => {
      this.setToken(Partners.namePartner);
      this.getLoggedInName.emit(true);
      return Partners;
    }));
  }

  // token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true;
    }
    return false;
  }
}
