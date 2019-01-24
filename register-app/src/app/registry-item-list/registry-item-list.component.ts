import { Component, OnInit, NgZone } from '@angular/core';
import { groupBy } from 'lodash';
import { RegistryItem } from '../registry-item';
import { RegistryItemService } from '../registry-item.service';
import { AuthenticationService, UserDetails } from '../authentication-service.service';

@Component({
  selector: 'app-register-item-list',
  templateUrl: './registry-item-list.component.html',
  styleUrls: ['./registry-item-list.component.css']
})
export class RegistryItemListComponent implements OnInit {

  groupedRegistryItems: RegistryItem[];
  userDetails: UserDetails;

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
    var objectToUpdate;
    objectToUpdate = this.groupedRegistryItems.find(x => x._id === $event._id)
    objectToUpdate.userRegistered = $event.userRegistered;
  }

  getUserDetails() {
    this.userDetails = this.authenticationService.getUserDetails();
  }

  ngOnInit() {
    this.getRegistryItems();
    this.getUserDetails();
  }

}
