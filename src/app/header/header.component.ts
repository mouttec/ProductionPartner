import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginbtn: boolean;
  logoutbtn: boolean;

  constructor(private authService: AuthService, private router: Router) {
    authService.getLoggedInName.subscribe((name:any) => this.changeName(name));
    if ( this.authService.isLoggedIn()) {
      this.loginbtn = false;
      this.logoutbtn = true;
    } else {
      this.loginbtn = true;
      this.logoutbtn = false;
    }
  }

  ngOnInit(): void {
  }

  private changeName(name: boolean) {
    this.loginbtn = !name;
    this.logoutbtn = name;
  }

  logout() {
    this.authService.deleteToken();
    this.router.navigate(['']);
    this.loginbtn = true;
    this.logoutbtn = false;
  }

}
