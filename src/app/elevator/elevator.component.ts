import { Component, OnInit } from '@angular/core';

import { ElevatorHandler } from '../../_classes/elevator.handler';

@Component({
  selector: 'app-elevator',
  templateUrl: './elevator.component.html',
  styleUrls: ['./elevator.component.scss']
})
export class ElevatorComponent implements OnInit {

  public get floor(): number {
    return this.elevatorHandler.currentFloor;
  }

  constructor(
    private elevatorHandler: ElevatorHandler
  ) { }

  ngOnInit() {
  }

}
