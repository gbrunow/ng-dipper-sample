import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarExampleComponent } from './car-example.component';

describe('CarExampleComponent', () => {
  let component: CarExampleComponent;
  let fixture: ComponentFixture<CarExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
