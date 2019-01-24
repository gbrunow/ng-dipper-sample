import { Injectable } from '@angular/core';
import { State, StateMachine } from 'dipper.js';

@Injectable()
export class ElevatorHandler {
    private idle = (new State())
        .hook({
            name: 'enter',
            action: () => console.log('idle')
        });


    private elevatorSM = (new StateMachine());
    // .trans
}
