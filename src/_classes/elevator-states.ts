import { State } from 'dipper.js';

import { DirectionEnum, ElevatorHelper } from './elevator.helper';

export const idle = (new State({ name: 'idle' }))
    .hook({
        name: 'enter',
        action: (data) => {
            console.log(`idle at floor ${data.context.currentFloor}`);
            // turn up/down sign off
        }
    })
    .hook({
        name: 'key-press',
        action: (data) => {
            const direction = ElevatorHelper.getDirection(data);
            if (direction.enum !== DirectionEnum.stay) {
                idle.emit(direction.str, data);
            }
        }
    });

export const goingUp = (new State({ name: 'up 🔺' }))
    .hook({
        name: 'enter',
        action: async (data) => {
            console.log('up 🔺');
            // turn up sign on

            await ElevatorHelper.move(data.context, DirectionEnum.up);
            if (data.context.currentFloor === data.context.floorCount) {
                data = {};
                goingUp.emit('top', data);
            } else {
                goingUp.emit('stop', data);
            }
        }
    })
    .hook({
        name: 'leave',
        action: (data) => {
            // turn up 🔺sign off
        }
    });

export const goingDown = (new State({ name: 'down 🔻' }))
    .hook({
        name: 'enter',
        action: async (data) => {
            console.log('down 🔻');
            // turn down 🔻 sign on

            await ElevatorHelper.move(data.context, DirectionEnum.down);
            if (data.context.currentFloor === 1) {
                goingDown.emit('bottom', data);
            } else {
                goingDown.emit('stop', data);
            }
        }
    })
    .hook({
        name: 'leave',
        action: (data) => {
            // turn down 🔻 sign off
        }
    });

export const top = (new State({ name: 'top' }))
    .hook({
        name: 'enter',
        action: (data) => {
            console.log('welcome to the top floor.');
        }
    })
    .hook({
        name: 'key-press',
        action: (data) => {
            const direction = ElevatorHelper.getDirection(data);
            if (direction.enum === DirectionEnum.down) {
                top.emit(direction.str, data);
            }
        }
    });

export const bottom = (new State({ name: 'bottom' }))
    .hook({
        name: 'enter',
        action: (data) => {
            console.log('welcome to the bottom floor.');
        }
    })
    .hook({
        name: 'key-press',
        action: (data) => {
            const direction = ElevatorHelper.getDirection(data);
            if (direction.enum === DirectionEnum.up) {
                top.emit(direction.str, data);
            }
        }
    });
