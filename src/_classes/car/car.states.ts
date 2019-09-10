import { State } from 'dipper.js';

export const idle = (new State({ name: 'idle' }))
    .hook({
        name: 'enter',
        action: (context) => {
            console.log({ idle: context });
            context.global.blinker = false;
        }
    });

export const left = (new State({ name: 'left' }))
    .hook({
        name: 'enter',
        action: (context) => {
            context.global.left = !context.global.left;
            context.global.right = false;

            if (!context.global.left) {
                left.emit('idle');
            }
        }
    });

export const right = (new State({ name: 'right' }))
    .hook({
        name: 'enter',
        action: (context) => {
            context.global.right = !context.global.right;
            context.global.left = false;

            if (!context.global.right) {
                right.emit('idle');
            }
        }
    });

export const blinker = (new State({ name: 'blinker' }))
    .hook({
        name: 'enter',
        action: (context) => {
            console.log('blinker');
            switch (context.local.event) {
                case 'left':
                    context.global.left = !context.global.left;
                    context.global.right = false;
                    break;
                case 'right':
                    context.global.right = !context.global.right;
                    context.global.left = false;
                    break;
                default:
                    context.global.blinker = !context.global.blinker;
                    break;
            }
        }
    });


export const breakOn = (new State())
    .hook({
        name: 'enter',
        action: (context) => {
            context.global.break = true;
        }
    });

export const breakOff = (new State())
    .hook({
        name: 'enter',
        action: (context) => {
            context.global.break = false;
        }
    });

export const backupOn = (new State())
    .hook({
        name: 'enter',
        action: (context) => {
            context.global.backup = true;
        }
    });

export const backupOff = (new State())
    .hook({
        name: 'enter',
        action: (context) => {
            context.global.backup = false;
        }
    });
