import anime from 'animejs/lib/anime.es.js';

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
    export function getDirection(data): Direction {
        const from = data.context.currentFloor;
        const to = data.floor;

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

    export function getDirectionFromContext(context): Direction {
        let direction: Direction;

        if (context.floors.length > 0) {
            if (context.floors.every(f => f > context.currentFloor)) {
                direction = { enum: DirectionEnum.up, str: 'up' };
            } else if (context.floors.every(f => f < context.currentFloor)) {
                direction = { enum: DirectionEnum.down, str: 'down' };
            } else {
                direction = { enum: DirectionEnum.stay, str: 'stay' };
            }
        } else {
            direction = { enum: DirectionEnum.stay, str: 'stay' };
        }

        return direction;
    }

    export function peekTarget(context, direction: DirectionEnum) {
        let next: number;
        switch (direction) {
            case DirectionEnum.up:
                next = context.floors
                    .filter(f => f > context.currentFloor)[0];
                break;
            case DirectionEnum.down:
                next = context.floors
                    .filter(f => f < context.currentFloor)[context.floors.length - 1];
                break;
            default:
                next = context.currentFloor;
        }

        return next || context.currentFloor;
    }

    export function visitFloor(context, direction: DirectionEnum) {
        let target: number;
        switch (direction) {
            case DirectionEnum.up:
                const higher = context.floors.filter(f => f >= context.currentFloor);
                if (higher.length > 0) {
                    target = higher.shift();
                    const index = context.floors.indexOf(target);
                    context.floors.splice(index, 1);
                }
                break;
            case DirectionEnum.down:
                const lower = context.floors.filter(f => f <= context.currentFloor);
                if (lower.length > 0) {
                    target = lower.pop();
                    const index = context.floors.indexOf(target);
                    context.floors.splice(index, 1);
                }
                break;
            default:
                target = context.currentFloor;
        }

        console.log('queue: ', context.floors);

        return target;
    }

    export function animate(context, direction: DirectionEnum, delay: number): any {
        const floorHeight = 70;

        const translateY = - floorHeight * (context.currentFloor - 1);

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

    async function moveToNext(context, direction: DirectionEnum, delay: number) {
        let target = peekTarget(context, direction);

        if (target !== context.currentFloor) {
            do {
                target = peekTarget(context, direction);

                context.currentFloor -= direction;
                await animate(context, direction, delay);

                delay = 0;
            } while (target !== context.currentFloor);
            visitFloor(context, direction);
        }


    }
    export async function move(context, direction: DirectionEnum) {
        let delay = 0;
        do {
            await moveToNext(context, direction, delay);
            delay = 2000;
        } while (peekTarget(context, direction) !== context.currentFloor);
    }
}
