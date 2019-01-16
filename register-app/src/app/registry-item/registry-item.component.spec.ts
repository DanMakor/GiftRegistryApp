import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryItemComponent } from './registry-item.component';

describe('RegistryItemComponent', () => {
  let component: RegistryItemComponent;
  let fixture: ComponentFixture<RegistryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
