import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {


  @Input() floors = 10;

  public get numberOfFloors(): Array<any> {
    return Array(this.floors);
  }

  constructor() { }

  ngOnInit() {
  }

}
