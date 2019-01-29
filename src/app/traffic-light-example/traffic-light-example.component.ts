import { Component, OnInit } from '@angular/core';

import { TrafficLightHandler } from '../../_classes/traffic-light/traffic-light.handler';

@Component({
  selector: 'app-traffic-light-example',
  templateUrl: './traffic-light-example.component.html',
  styleUrls: ['./traffic-light-example.component.scss']
})
export class TrafficLightExampleComponent implements OnInit {

  constructor(
    private trafficLightHandler: TrafficLightHandler
  ) { }

  public get color(): string {
    return this.trafficLightHandler.light;
  }

  ngOnInit() {
  }

}
