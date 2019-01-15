import * as MouseOver from './EnumMode';

export default interface IEntity {
  minDelay?: number,
  maxDelay?: number,
  minEntities?: number,
  maxEntities?: number,
  minSpeed?: number,
  maxSpeed?: number,
  maxLargeTurnDeg?: number,
  maxSmallTurnDeg?: number,
  maxWiggleDeg?: number,
  imageSprite?: string,
  entityWidth?: number,
  entityHeight?: number,
  frameNumber?: number,
  zoom?: number, // random zoom variation from 1 to 10 - 10 being full size.
  canFly?: boolean,
  canDie?: boolean,
  numDeathTypes?: number,
  monitorMouseMovement?: boolean,
  eventDistanceToBug?: number,
  minTimeBetweenMultiply?: number,
  mouseOver?: MouseOver.Mode
}