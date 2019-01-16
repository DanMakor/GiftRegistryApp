import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userDetails: UserDetails;
  userSubscription: Subscription;

  logout() {
    this.authenticationService.logout();
  }

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.userSubscription = this.authenticationService.getUser().subscribe((user) => this.userDetails = user);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
