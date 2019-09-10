import { State } from 'dipper.js';

export const green = (new State({ name: 'green' }))
    .hook({
        name: 'enter',
        action: (context) => {
            context.global.light = 'green';
            setTimeout(() => green.emit('next'), 2500);
        }
    });

export const yellow = (new State({ name: 'red' }))
    .hook({
        name: 'enter',
        action: (context) => {
            context.global.light = 'yellow';
            setTimeout(() => yellow.emit('next'), 1500);
        }
    });

export const red = (new State({ name: 'red' }))
    .hook({
        name: 'enter',
        action: (context) => {
            context.global.light = 'red';
            setTimeout(() => red.emit('next'), 2500);
        }
    });
