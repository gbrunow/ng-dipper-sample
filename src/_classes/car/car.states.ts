import { State } from 'dipper.js';

export const idle = (new State({ name: 'idle' }))
    .hook({
        name: 'enter',
        action: (data) => {
            data.context.blinker = false;
        }
    });

export const left = (new State({ name: 'left' }))
    .hook({
        name: 'enter',
        action: (data) => {
            data.context.left = !data.context.left;
            data.context.right = false;
        }
    });

export const right = (new State({ name: 'right' }))
    .hook({
        name: 'enter',
        action: (data) => {
            data.context.right = !data.context.right;
            data.context.left = false;
        }
    });

export const blinker = (new State({ name: 'blinker' }))
    .hook({
        name: 'enter',
        action: (data) => {
            switch (data.event) {
                case 'left':
                    data.context.left = !data.context.left;
                    data.context.right = false;
                    break;
                case 'right':
                    data.context.right = !data.context.right;
                    data.context.left = false;
                    break;
                default:
                    data.context.blinker = !data.context.blinker;
                    break;
            }
        }
    });


export const breakOn = (new State())
    .hook({
        name: 'enter',
        action: (data) => {
            data.context.break = true;
        }
    });

export const breakOff = (new State())
    .hook({
        name: 'enter',
        action: (data) => {
            data.context.break = false;
        }
    });

export const backupOn = (new State())
    .hook({
        name: 'enter',
        action: (data) => {
            data.context.backup = true;
        }
    });

export const backupOff = (new State())
    .hook({
        name: 'enter',
        action: (data) => {
            data.context.backup = false;
        }
    });
