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
  public get breaking(): boolean {
    return this.carHandler.breaking;
  }

  @HostBinding('class.backup')
  public get backingup(): boolean {
    return this.carHandler.backingup;
  }

  @HostBinding('class.left')
  public get left(): boolean {
    return this.clock && !this.carHandler.turnContext.blinker
      && this.carHandler.turnContext.left;
  }

  @HostBinding('class.right')
  public get right(): boolean {
    return this.clock && !this.carHandler.turnContext.blinker
      && this.carHandler.turnContext.right;
  }

  @HostBinding('class.blinker')
  public get blinker(): boolean {
    return this.clock && this.carHandler.turnContext.blinker;
  }

  public get context(): any {
    return this.carHandler
      ? this.carHandler.turnContext
      : {};
  }

  @HostBinding('class.clock')
  clock = true;
  ngOnInit() {
    setInterval(() => this.clock = !this.clock, 500);
  }

  turn(direction: string) {
    this.carHandler.turn(direction);
  }

  blink() {
    this.carHandler.blink();
  }

  break() {
    this.carHandler.break();
  }

  backup() {
    this.carHandler.backup();
  }
}
