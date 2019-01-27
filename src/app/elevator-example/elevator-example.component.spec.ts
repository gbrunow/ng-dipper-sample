import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevatorExampleComponent } from './elevator-example.component';

describe('ElevatorExampleComponent', () => {
  let component: ElevatorExampleComponent;
  let fixture: ComponentFixture<ElevatorExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElevatorExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElevatorExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
