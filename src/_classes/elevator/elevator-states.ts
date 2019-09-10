import { State } from 'dipper.js';

import { DirectionEnum, ElevatorHelper } from './elevator.helper';

export const idle = (new State({ name: 'idle' }))
    .hook({
        name: 'enter',
        action: (context) => {
            const direction = ElevatorHelper.getDirectionFromContext(context);
            if (direction.enum !== DirectionEnum.stay) {
                idle.emit(direction.str, context);
            } else {
                console.log(`idle at floor ${context.global.currentFloor}`);
            }
            // turn up/down sign off
        }
    })
    .hook({
        name: 'key-press',
        action: (context) => {
            const direction = ElevatorHelper.getDirection(context);
            if (direction.enum !== DirectionEnum.stay) {
                idle.emit(direction.str, context);
            }
        }
    });

export const goingUp = (new State({ name: 'up 🔺' }))
    .hook({
        name: 'enter',
        action: async (context) => {
            console.log('up 🔺');
            // turn up sign on

            await ElevatorHelper.move(context, DirectionEnum.up);
            if (context.global.currentFloor === context.global.floorCount) {
                context = {};
                goingUp.emit('top');
            } else {
                goingUp.emit('stop');
            }
        }
    })
    .hook({
        name: 'leave',
        action: (context) => {
            // turn up 🔺sign off
        }
    });

export const goingDown = (new State({ name: 'down 🔻' }))
    .hook({
        name: 'enter',
        action: async (context) => {
            console.log('down 🔻');
            // turn down 🔻 sign on

            await ElevatorHelper.move(context, DirectionEnum.down);
            if (context.global.currentFloor === 1) {
                goingDown.emit('bottom');
            } else {
                goingDown.emit('stop');
            }
        }
    })
    .hook({
        name: 'leave',
        action: (context) => {
            // turn down 🔻 sign off
        }
    });

export const top = (new State({ name: 'top' }))
    .hook({
        name: 'enter',
        action: (context) => {
            console.log('welcome to the top floor.');
            if (context.global.floors.length > 0) {
                top.emit('down', context);
            }
        }
    })
    .hook({
        name: 'key-press',
        action: (context) => {
            const direction = ElevatorHelper.getDirection(context);
            if (direction.enum === DirectionEnum.down) {
                top.emit(direction.str, context);
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
                bottom.emit(direction.str, data);
            }
        }
    });
