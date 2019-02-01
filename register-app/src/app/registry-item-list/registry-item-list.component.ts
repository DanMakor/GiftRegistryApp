import { Component, OnInit, NgZone } from '@angular/core';
import { groupBy, cloneDeep } from 'lodash';
import { RegistryItem } from '../registry-item';
import { RegistryItemService } from '../registry-item.service';
import { AuthenticationService, UserDetails } from '../authentication-service.service';
import * as $ from 'jquery';
import 'popper.js';
import 'bootstrap';

@Component({
  selector: 'app-register-item-list',
  templateUrl: './registry-item-list.component.html',
  styleUrls: ['./registry-item-list.component.css']
})
export class RegistryItemListComponent implements OnInit {

  groupedRegistryItems: RegistryItem[][];
  userDetails: UserDetails;
  toastText: string;
  toastHeaderText: string;

  constructor(
    private registerItemService: RegistryItemService, 
    private authenticationService: AuthenticationService
  ) { }

  convertObjectArrayTo2dArray(array: any): any {
    // Step 1. Get all the object keys.
    let arrayProps = Object.keys(array);
    // Step 2. Create an empty array.
    let twoDArray = [];
    // Step 3. Iterate through all keys.
    for (var prop of arrayProps) { 
        twoDArray.push(array[prop]);
    }
    return twoDArray;
  }

  getRegistryItems(): void {
    this.registerItemService.getRegistryItems()
      .subscribe(registryItems => {
        this.groupedRegistryItems = this.convertObjectArrayTo2dArray(groupBy(registryItems, "category.title"));
    },
    function(err) {
      console.log(err);
    });
  }

  userRegistered($event) {
    var gRICopy = cloneDeep(this.groupedRegistryItems);
    gRICopy.forEach((array) => {
      array.forEach((registryItem) => {
        if (registryItem._id === $event._id) {
          registryItem.userRegistered = $event.userRegistered;
        }
      })
    })
    this.groupedRegistryItems = gRICopy;
    if ($event.userRegistered) {
      this.toastText = `You have successfully registered to get us ${$event.title}`
      this.toastHeaderText = "Thanks!"
    } else {
      this.toastText = `You are no longer registered to get us ${$event.title}`
      this.toastHeaderText = "Unthanks"
    }
    
    $('.toast').toast('show');
  }

  getUserDetails() {
    this.userDetails = this.authenticationService.getUserDetails();
  }

  ngOnInit() {
    this.getRegistryItems();
    this.getUserDetails();
  }

}
