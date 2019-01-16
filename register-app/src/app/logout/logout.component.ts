import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  logout() {
    this.authenticationService.logout();
  }

  ngOnInit() {
  }

}
