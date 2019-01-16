import { Injectable } from '@angular/core';
import { AuthenticationService, UserDetails } from './authentication-service.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private subject: BehaviorSubject<UserDetails>

  

  constructor(private authenticationService: AuthenticationService) {
    this.subject = new BehaviorSubject<UserDetails>(this.authenticationService.getUserDetails());
  }
}
