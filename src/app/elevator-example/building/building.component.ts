import { Component, Input, OnInit } from '@angular/core';
import { ElevatorHandler } from 'src/_classes/elevator.handler';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})
export class BuildingComponent implements OnInit {

  @Input() floors = 10;

  public get numberOfFloors(): Array<any> {
    return Array(this.floors);
  }

  constructor(
    private elevatorHandler: ElevatorHandler
  ) { }

  ngOnInit() {
    this.elevatorHandler.floorCount = this.floors;
  }

}
