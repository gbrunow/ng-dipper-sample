import { State } from 'dipper.js';


export const idle = (new State())
    .hook({
        name: 'enter',
        action: () => console.log('idle')
    });
