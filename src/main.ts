import { Dispatch } from "./Dispatch";
import { Mode } from "./EnumMode";

new Dispatch({
    minDelay: 500,
    maxDelay: 10000,
    minBugs: 2,
    maxBugs: 20,
    minSpeed: 5,
    maxSpeed: 10,
    maxLargeTurnDeg: 150,
    maxSmallTurnDeg: 10,
    maxWiggleDeg: 5,
    imageSprite: 'fly-sprite.png',
    bugWidth: 13,
    bugHeight: 14,
    frameNumber: 50,
    zoom: 10, // random zoom variation from 1 to 10 - 10 being full size.
    canFly: true,
    canDie: true,
    numDeathTypes: 3,
    monitorMouseMovement: false,
    eventDistanceToBug: 40,
    minTimeBetweenMultiply: 1000,
    mouseOver: Mode.random
});