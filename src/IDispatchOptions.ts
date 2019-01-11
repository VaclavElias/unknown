import * as MouseOver from './EnumMode';

export default interface IDispatchOptions {
  minDelay: number,
  maxDelay: number,
  minBugs: number,
  maxBugs: number,
  minSpeed: number,
  maxSpeed: number,
  maxLargeTurnDeg: number,
  maxSmallTurnDeg: number,
  maxWiggleDeg: number,
  imageSprite: string,
  bugWidth: number,
  bugHeight: number,
  frameNumber: number,
  zoom: number, // random zoom variation from 1 to 10 - 10 being full size.
  canFly: boolean,
  canDie: boolean,
  numDeathTypes: number,
  monitorMouseMovement: boolean,
  eventDistanceToBug: number,
  minTimeBetweenMultiply: number,
  mouseOver: MouseOver.Mode
}