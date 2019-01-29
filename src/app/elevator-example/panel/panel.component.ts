import { Component, Input, OnInit } from '@angular/core';
import { ElevatorHandler } from 'src/_classes/elevator/elevator.handler';

export interface Movement {
  translateY: number;
  duration: number;
  floor: number;
}
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {


  @Input() floors = 5;

  public get numberOfFloors(): Array<any> {
    return Array(this.floors);
  }

  constructor(
    private elevatorHandler: ElevatorHandler
  ) { }

  ngOnInit() {
  }

  move(floor: number) {
    this.elevatorHandler.move(floor);
  }
}
