import { Injectable } from '@angular/core';
import { StateMachine } from 'dipper.js';

import { bottom, goingDown, goingUp, idle, top } from './elevator-states';

@Injectable()
export class ElevatorHandler {
    private _floors: number[] = [];
    private _stateMachine = new StateMachine();

    private _context = {
        currentFloor: 1,
        floorCount: 10,
        floors: this._floors,
    };


    constructor() {
        this._stateMachine.context = this._context;

        this._stateMachine
            .transit({ from: idle, to: goingUp, on: 'up' })
            .transit({ from: idle, to: goingDown, on: 'down' })
            .transit({ from: goingUp, to: top, on: 'top' })
            .transit({ from: goingUp, to: idle, on: 'stop' })
            .transit({ from: goingDown, to: bottom, on: 'bottom' })
            .transit({ from: goingDown, to: idle, on: 'stop' })
            .transit({ from: top, to: goingDown, on: 'down' })
            .transit({ from: bottom, to: goingUp, on: 'up' });

        this._stateMachine.run({ initialState: idle });
    }

    public get currentFloor(): number {
        return this._context.currentFloor;
    }

    public get floorCount(): number {
        return this._context.floorCount;
    }

    public set floorCount(count: number) {
        this._context.floorCount = count;
    }

    public move(floor: number) {
        if (!this._floors.includes(floor)) {
            this._floors.push(floor);
            this._floors = this._floors.sort((a, b) => a - b);
            console.log(`selected: ${floor}`, this._floors);
            this._stateMachine.trigger('key-press', { floor });
        }
    }
}
