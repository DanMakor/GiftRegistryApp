import { Component, OnInit } from '@angular/core';
import { RegistryItem } from '../registry-item';
import { Category } from '../category';
import { RegistryItemService } from '../registry-item.service';

@Component({
  selector: 'app-registry-item-form',
  templateUrl: './registry-item-form.component.html',
  styleUrls: ['./registry-item-form.component.css']
})
export class RegistryItemFormComponent implements OnInit {

  registryItem: RegistryItem;
  category: Category;
  categories: Category[];

  addRegistryItem(): void {
    console.log(this.registryItem);
    this.registryItemService.addRegistryItem(this.registryItem)
      .subscribe(registryItem => {
        console.log(registryItem);
      });
  }

  addCategory(): void {
    this.registryItemService.addCategory(this.category)
      .subscribe(category => {
        console.log(category);
      });
  }

  constructor(private registryItemService: RegistryItemService) { }

  ngOnInit() {
    this.registryItemService.getCategories().subscribe((categories) => {
        this.categories = categories;
    })
    this.registryItem = new RegistryItem();
    this.registryItem.category = new Category();
    this.category = new Category();
  }

}
