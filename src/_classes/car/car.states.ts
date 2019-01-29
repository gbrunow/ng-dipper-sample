import { State } from 'dipper.js';

export const idle = (new State({ name: 'idle' }))
    .hook({
        name: 'enter',
        action: (data) => {
            data.context.blinker = false;

            // if (data.context.left) {
            //     idle.emit('left');
            // } else if (data.context.right) {
            //     idle.emit('right');
            // }
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
        action: () => {
            // turn break on
        }
    });
