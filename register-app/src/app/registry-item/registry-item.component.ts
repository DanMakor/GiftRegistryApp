import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RegistryItem } from '../registry-item';
import { RegistryItemService } from '../registry-item.service';
import { AuthenticationService, UserDetails } from '../authentication-service.service';
import cloneDeep from 'lodash/cloneDeep';

import * as $ from 'jquery';

@Component({
  selector: 'app-registry-item',
  templateUrl: './registry-item.component.html',
  styleUrls: ['./registry-item.component.css']
})
export class RegistryItemComponent implements OnInit {

  @Input() registryItem: RegistryItem;
  @Output() userRegistered = new EventEmitter();
  userDetails: UserDetails;

  updateUserRegistered() {
    var newRegistryItem = cloneDeep(this.registryItem);
    newRegistryItem.userRegistered = this.registryItem.userRegistered ? null : this.userDetails.name;

    this.registryItemService.updateRegistryItem(newRegistryItem).subscribe(registryItem => {
      this.registryItem = registryItem;
      this.userRegistered.emit(this.registryItem);
    })
  }

  constructor(private registryItemService: RegistryItemService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.userDetails = this.authenticationService.getUserDetails()
  }

}
