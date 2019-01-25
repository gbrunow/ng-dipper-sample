import { Component, Input, OnInit } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';

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


  @Input() floors = 10;

  private _currentFloor = 1;
  private _animation: any;
  private _timeline: any = anime.timeline({
    targets: '.elevator',
    easing: 'easeInOutQuad',
    delay: 500,
  });

  private _floors: number[] = [];

  public get numberOfFloors(): Array<any> {
    return Array(this.floors);
  }

  constructor() { }

  ngOnInit() {
  }

  move(floor: number) {
    if (!this._animation || this._animation.completed) {
      this._animation = this.animate(floor);
    } else {
      this._floors.push(floor);
    }
  }

  animate(floor: number): any {
    const floorHeight = 70;

    const translateY = -(floorHeight * (floor - 1));
    const duration = 500 * Math.abs(this._currentFloor - floor);

    return anime({
      targets: '.elevator',
      easing: 'easeInOutQuad',
      delay: 500,
      translateY,
      duration,
      complete: () => {
        this._currentFloor = floor;
        if (this._floors.length > 0) {
          this._animation.children.push(this.animate(this._floors.shift()));
        }
      }
    });
  }
}
