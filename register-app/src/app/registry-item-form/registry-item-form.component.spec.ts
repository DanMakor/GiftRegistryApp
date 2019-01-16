import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryItemFormComponent } from './registry-item-form.component';

describe('RegistryItemFormComponent', () => {
  let component: RegistryItemFormComponent;
  let fixture: ComponentFixture<RegistryItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistryItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistryItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
