import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficLightExampleComponent } from './traffic-light-example.component';

describe('TrafficLightExampleComponent', () => {
  let component: TrafficLightExampleComponent;
  let fixture: ComponentFixture<TrafficLightExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrafficLightExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficLightExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
