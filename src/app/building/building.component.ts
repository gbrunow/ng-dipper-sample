import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
