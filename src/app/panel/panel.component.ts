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

  private _currentFloor = 1;
  private _currentAnimation: any;

  public get numberOfFloors(): Array<any> {
    return Array(this.floors);
  }

  constructor() { }

  ngOnInit() {
  }

  move(floor: number) {
    const floorHeight = 70;
    const animationParams = {
      targets: '.elevator',
      translateY: -(floorHeight * (floor - 1)),
      duration: 500 * Math.abs(this._currentFloor - floor),
      easing: 'easeInOutQuad',
    };

    if (this._currentAnimation && !this._currentAnimation.completed) {
      this._currentAnimation.complete = () => anime(animationParams);
    } else {
      this._currentAnimation = anime(animationParams);
    }

    this._currentFloor = floor;
  }

}
