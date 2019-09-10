import { Injectable } from '@angular/core';
import { StateMachine } from 'dipper.js';

import { backupOff, backupOn, blinker, breakOff, breakOn, idle, left, right } from './car.states';

@Injectable()
export class CarHandler {
    private _turnStateMachine = new StateMachine();
    private _turnContext = {
        left: false,
        right: false,
        blinker: false
    };

    private _breakStateMachine = new StateMachine();
    private _breakContext = {
        break: false
    };

    private _backupStateMachine = new StateMachine();
    private _backupContext = {
        backup: false
    };

    constructor() {
        this._turnStateMachine.context = this._turnContext;

        this._turnStateMachine
            .transit({ from: idle, to: blinker, on: 'blink' })
            .transit({ from: idle, to: left, on: 'left' })
            .transit({ from: idle, to: right, on: 'right' })
            .transit({ from: left, to: left, on: 'left' })
            .transit({ from: left, to: blinker, on: 'blink' })
            .transit({ from: left, to: right, on: 'right' })
            .transit({ from: left, to: idle, on: 'idle' })
            .transit({ from: right, to: right, on: 'right' })
            .transit({ from: right, to: blinker, on: 'blink' })
            .transit({ from: right, to: left, on: 'left' })
            .transit({ from: right, to: idle, on: 'idle' })
            .transit({ from: blinker, to: idle, on: 'blink' })
            .transit({ from: blinker, to: blinker, on: 'left' })
            .transit({ from: blinker, to: blinker, on: 'right' });

        this._turnStateMachine.run({ initialState: idle });

        this._breakStateMachine.context = this._breakContext;

        this._breakStateMachine
            .transit({ from: breakOn, to: breakOff, on: 'break' })
            .transit({ from: breakOff, to: breakOn, on: 'break' });

        this._breakStateMachine.run({ initialState: breakOff });

        this._backupStateMachine.context = this._backupContext;

        this._backupStateMachine
            .transit({ from: backupOn, to: backupOff, on: 'backup' })
            .transit({ from: backupOff, to: backupOn, on: 'backup' });

        this._backupStateMachine.run({ initialState: backupOff });
    }

    public get turnContext(): any {
        return this._turnContext;
    }

    public get backingup(): boolean {
        return this._backupContext.backup;
    }

    public get breaking(): boolean {
        return this._breakContext.break;
    }

    public turn(direction: string): void {
        this._turnStateMachine.emit(direction);
    }

    public blink(): void {
        this._turnStateMachine.emit('blink');
    }

    public break(): void {
        this._breakStateMachine.emit('break');
    }

    public backup(): void {
        this._backupStateMachine.emit('backup');
    }

}
