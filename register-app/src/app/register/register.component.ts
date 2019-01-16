import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  credentials: TokenPayload = {
    name: ''
  }

  error: string; 

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  register() {
    this.error = null;
    this.authenticationService.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/registryitemlist');
    }, (err) => {
      this.error = err.error;
    });
  }

  ngOnInit() {

  }

}
