import { State } from 'dipper.js';

export const bottom = (new State())
    .hook({
        name: 'enter',
        action: () => {
            // do something
        }
    })
    .hook({
        name: 'leave',
        action: () => {
            // do something
        }
    });
