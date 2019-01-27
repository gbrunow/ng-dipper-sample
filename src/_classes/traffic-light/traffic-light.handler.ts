import { Injectable } from '@angular/core';
import { StateMachine } from 'dipper.js';

import { green, red, yellow } from './traffic-light.states';

@Injectable()
export class TrafficLightHandler {
    private _stateMachine = new StateMachine();

    private _context = {
        light: 'green'
    };

    constructor() {
        this._stateMachine.context = this._context;

        this._stateMachine
            .transit({ from: green, to: yellow, on: 'next' })
            .transit({ from: yellow, to: red, on: 'next' })
            .transit({ from: red, to: green, on: 'next' });

        this._stateMachine.run({ initialState: green });
    }

    public get light() {
        return this._context.light;
    }
}
