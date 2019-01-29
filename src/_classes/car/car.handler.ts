import { Injectable } from '@angular/core';
import { StateMachine } from 'dipper.js';

import { blinker, idle, left, right } from './car.states';

@Injectable()
export class CarHandler {
    private _turnStateMachine = new StateMachine();
    private _turnContext = {
        left: false,
        right: false,
        blinker: false
    };

    constructor() {
        this._turnStateMachine.context = this._turnContext;

        this._turnStateMachine
            .transit({ from: idle, to: blinker, on: 'blink' })
            .transit({ from: idle, to: left, on: 'left' })
            .transit({ from: idle, to: right, on: 'right' })
            .transit({ from: left, to: idle, on: 'left' })
            .transit({ from: left, to: blinker, on: 'blink' })
            .transit({ from: left, to: right, on: 'right' })
            .transit({ from: right, to: idle, on: 'right' })
            .transit({ from: right, to: blinker, on: 'blink' })
            .transit({ from: right, to: left, on: 'left' })
            .transit({ from: blinker, to: idle, on: 'blink' })
            .transit({ from: blinker, to: blinker, on: 'left' })
            .transit({ from: blinker, to: blinker, on: 'right' });

        this._turnStateMachine.run({ initialState: idle });
    }

    public get turnContext(): any {
        return this._turnContext;
    }

    public turn(direction: string): void {
        this._turnStateMachine.emit(direction);
    }

    public blink(): void {
        this._turnStateMachine.emit('blink');
    }

}
