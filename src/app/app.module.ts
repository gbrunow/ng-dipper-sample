import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ElevatorHandler } from '../_classes/elevator.handler';
import { AppComponent } from './app.component';
import { BuildingComponent } from './elevator-example/building/building.component';
import { ElevatorExampleComponent } from './elevator-example/elevator-example.component';
import { ElevatorComponent } from './elevator-example/elevator/elevator.component';
import { FloorComponent } from './elevator-example/floor/floor.component';
import { PanelComponent } from './elevator-example/panel/panel.component';

@NgModule({
  declarations: [
    AppComponent,
    ElevatorComponent,
    PanelComponent,
    BuildingComponent,
    FloorComponent,
    ElevatorExampleComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  providers: [ElevatorHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
