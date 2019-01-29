import { Component, HostBinding, OnInit } from '@angular/core';
import { CarHandler } from 'src/_classes/car/car.handler';

import { blinker } from '../../_classes/car/car.states';

@Component({
  selector: 'app-car-example',
  templateUrl: './car-example.component.html',
  styleUrls: ['./car-example.component.scss']
})
export class CarExampleComponent implements OnInit {

  constructor(
    private carHandler: CarHandler
  ) { }

  @HostBinding('class.break')
  break = false;

  @HostBinding('class.backup')
  backup = false;

  @HostBinding('class.left')
  public get left(): boolean {
    return !this.carHandler.turnContext.blinker
      && this.carHandler.turnContext.left;
  }

  @HostBinding('class.right')
  public get right(): boolean {
    return !this.carHandler.turnContext.blinker
      && this.carHandler.turnContext.right;
  }

  @HostBinding('class.blinker')
  public get blinker(): boolean {
    return this.carHandler.turnContext.blinker;
  }

  ngOnInit() {
  }

  turn(direction: string) {
    this.carHandler.turn(direction);
  }

  blink() {
    this.carHandler.blink();
  }
}
