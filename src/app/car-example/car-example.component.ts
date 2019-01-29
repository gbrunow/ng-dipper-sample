import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-example',
  templateUrl: './car-example.component.html',
  styleUrls: ['./car-example.component.scss']
})
export class CarExampleComponent implements OnInit {

  constructor() { }

  @HostBinding('class.break')
  break = false;

  @HostBinding('class.backup')
  backup = false;

  @HostBinding('class.left')
  left = true;

  @HostBinding('class.right')
  right = false;

  @HostBinding('class.blinker')
  blinkers = false;

  ngOnInit() {
    // setInterval(() => {
    //   this.break = !this.break;
    //   this.backup = !this.backup;
    // }, 1000);

    // this.runBlinkers();
  }

  runBlinkers() {
    setTimeout(() => {
      this.blinkers = !this.blinkers;
      if (this.blinkers) {
        this.left = false;
        this.right = false;
      } else {
        this.left = true;
      }
      this.runBlinkers();
    }, Math.random() * 10000);
  }
}
