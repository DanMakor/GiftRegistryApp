import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryItemListComponent } from './registry-item-list.component';

describe('RegisterItemListComponent', () => {
  let component: RegistryItemListComponent;
  let fixture: ComponentFixture<RegistryItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistryItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistryItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
