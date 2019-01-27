import { NgModule } from '@angular/core';
import { MatButtonModule, MatTabsModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ElevatorHandler } from '../_classes/elevator/elevator.handler';
import { TrafficLightHandler } from '../_classes/traffic-light/traffic-light.handler';
import { AppComponent } from './app.component';
import { BuildingComponent } from './elevator-example/building/building.component';
import { ElevatorExampleComponent } from './elevator-example/elevator-example.component';
import { ElevatorComponent } from './elevator-example/elevator/elevator.component';
import { FloorComponent } from './elevator-example/floor/floor.component';
import { PanelComponent } from './elevator-example/panel/panel.component';
import { TrafficLightExampleComponent } from './traffic-light-example/traffic-light-example.component';

@NgModule({
  declarations: [
    AppComponent,
    ElevatorComponent,
    PanelComponent,
    BuildingComponent,
    FloorComponent,
    ElevatorExampleComponent,
    TrafficLightExampleComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTabsModule
  ],
  providers: [ElevatorHandler, TrafficLightHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
