import IEntity from "./IEntity";
import { Mode } from "./EnumMode";

// the default configuration for the controller
export default abstract class Defaults {
  // configuration to show flies
  public static readonly Config: IEntity = {
    minDelay: 500,
    maxDelay: 10000,
    minEntities: 2,
    maxEntities: 20,
    minSpeed: 5,
    maxSpeed: 10,
    maxLargeTurnDeg: 150,
    maxSmallTurnDeg: 10,
    maxWiggleDeg: 5,
    imageSprite: 'fly-sprite.png',
    entityWidth: 13,
    entityHeight: 14,
    frameNumber: 5,
    zoom: 10, // random zoom variation from 1 to 10 - 10 being full size.
    canFly: true,
    canDie: true,
    numDeathTypes: 3,
    monitorMouseMovement: false,
    eventDistanceToBug: 40,
    minTimeBetweenMultiply: 1000,
    mouseOver: Mode.random
  }
}