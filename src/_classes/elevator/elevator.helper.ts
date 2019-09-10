import anime from 'animejs/lib/anime.es.js';
import { ActionContext } from 'dipper.js';

export enum DirectionEnum {
    up = -1,
    down = 1,
    stay = 0
}

export interface Direction {
    enum: DirectionEnum;
    str: string;
}

export module ElevatorHelper {
    export function getDirection(context: ActionContext): Direction {
        const from = context.global.currentFloor;
        const to = context.local.floor;

        let direction: Direction;
        if (to > from) {
            direction = { enum: DirectionEnum.up, str: 'up' };
        } else if (to < from) {
            direction = { enum: DirectionEnum.down, str: 'down' };
        } else {
            direction = { enum: DirectionEnum.stay, str: 'stay' };
        }

        return direction;
    }

    export function getDirectionFromContext(context: ActionContext): Direction {
        let direction: Direction;

        if (context.global.floors.length > 0) {
            if (context.global.floors.every(f => f > context.global.currentFloor)) {
                direction = { enum: DirectionEnum.up, str: 'up' };
            } else if (context.global.floors.every(f => f < context.global.currentFloor)) {
                direction = { enum: DirectionEnum.down, str: 'down' };
            } else {
                direction = { enum: DirectionEnum.stay, str: 'stay' };
            }
        } else {
            direction = { enum: DirectionEnum.stay, str: 'stay' };
        }

        return direction;
    }

    export function peekTarget(context: ActionContext, direction: DirectionEnum) {
        let next: number;
        switch (direction) {
            case DirectionEnum.up:
                next = context.global.floors
                    .filter(f => f > context.global.currentFloor)[0];
                break;
            case DirectionEnum.down:
                next = context.global.floors
                    .filter(f => f < context.global.currentFloor)[context.global.floors.length - 1];
                break;
            default:
                next = context.global.currentFloor;
        }

        return next || context.global.currentFloor;
    }

    export function visitFloor(context: ActionContext, direction: DirectionEnum) {
        let target: number;
        switch (direction) {
            case DirectionEnum.up:
                const higher = context.global.floors.filter(f => f >= context.global.currentFloor);
                if (higher.length > 0) {
                    target = higher.shift();
                    const index = context.global.floors.indexOf(target);
                    context.global.floors.splice(index, 1);
                }
                break;
            case DirectionEnum.down:
                const lower = context.global.floors.filter(f => f <= context.global.currentFloor);
                if (lower.length > 0) {
                    target = lower.pop();
                    const index = context.global.floors.indexOf(target);
                    context.global.floors.splice(index, 1);
                }
                break;
            default:
                target = context.global.currentFloor;
        }

        console.log('queue: ', context.global.floors);

        return target;
    }

    export function animate(context: ActionContext, direction: DirectionEnum, delay: number): any {
        const floorHeight = 70;

        const translateY = - floorHeight * (context.global.currentFloor - 1);

        const promise = new Promise((resolve) => {
            anime({
                targets: '.elevator',
                easing: 'linear',
                translateY,
                duration: 500,
                delay,
                complete: () => {
                    resolve();
                }
            });
        });

        return promise;

    }

    async function moveToNext(context: ActionContext, direction: DirectionEnum, delay: number) {
        let target = peekTarget(context, direction);

        if (target !== context.global.currentFloor) {
            do {
                target = peekTarget(context, direction);

                context.global.currentFloor -= direction;
                await animate(context, direction, delay);

                delay = 0;
            } while (target !== context.global.currentFloor);
            visitFloor(context, direction);
        }


    }
    export async function move(context: ActionContext, direction: DirectionEnum) {
        let delay = 0;
        do {
            await moveToNext(context, direction, delay);
            delay = 2000;
        } while (peekTarget(context, direction) !== context.global.currentFloor);
    }
}
