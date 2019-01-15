import IEntity from "./IEntity";
import { Mode } from "./EnumMode";

export default abstract class Entities {
  private static _entities: IEntity[] = [];

  public static get list(): IEntity[] {
    return this._entities;
  }

  private static readonly flies: IEntity = {
    imageSprite: 'fly-sprite.png',
    minDelay: 500,
    maxDelay: 10000,
    minEntities: 2,
    maxEntities: 20,
    minSpeed: 5,
    maxSpeed: 10,
    maxLargeTurnDeg: 150,
    maxSmallTurnDeg: 10,
    maxWiggleDeg: 5,
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

  private static readonly spiders: IEntity = {
    imageSprite: 'spider-sprite.png',
    entityWidth: 69,
    entityHeight: 90,
    frameNumber: 7,
    canFly: false,
    canDie: true,
    numDeathTypes: 2,
    zoom: 6,
    minDelay: 200,
    maxDelay: 3000,
    minSpeed: 6,
    maxSpeed: 13,
    minEntities: 3,
    maxEntities: 10
  }

  static initialize(): void {
    this._entities.push(
      this.flies,
      this.spiders
    );
  }

  static add(entity: IEntity): void {
    this._entities.push(entity);
  }

  static remove(): void {

  }

  static get(id: number): IEntity | null {
    if(this._entities.length < id) {
      return this._entities[id];
    }
    else {
      return null;
    }
  }
}