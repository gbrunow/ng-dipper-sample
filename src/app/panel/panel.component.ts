import { Component, Input, OnInit } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';

// import * as anime from 'animejs';
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

  move(floor: number) {
    console.log(floor);

    const floorHeight = 70;

    anime({
      targets: '.elevator',
      translateY: -(floorHeight * (floor - 1)),
      duration: 500 * floor,
      easing: 'easeInOutQuad'
    });
  }

}
