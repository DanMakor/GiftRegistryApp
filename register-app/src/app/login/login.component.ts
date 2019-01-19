import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication-service.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string;
  credentials: TokenPayload = {};

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  login() {
    this.error = null;
    this.authenticationService.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/registryitemlist');
    }, (err) => {
      this.error = err.error;
    });  }

  ngOnInit() {
  }

}
