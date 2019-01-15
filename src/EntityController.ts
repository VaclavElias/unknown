/** Unknown
 * Copyright, 2019.
 */

import IEntity from "./IEntity";
import Errors from "./Errors";
import Support from "./Support";

//
export class EntityController {
  private transform: Function = Support.getTransformApi();
  private entities: IEntity[] = [];

  private _isActive: boolean = false;
  private _canStart: boolean = false;

  public get isActive(): boolean {
    return this._isActive;
  };

  public get canStart(): boolean {
    return this._canStart;
  }

  constructor();
  constructor(entity: IEntity);

  constructor(entity?: IEntity) {
    if(entity) {
      this.addEntity(entity);
    }
  }

  public addEntity(entity: IEntity): void {
    this.entities.push(entity);
    this._canStart = this.entities.length > 0;
  }

  public removeEntity(): void {
    if(!this._canStart) {
      return;
    }
    else {

      this._canStart = this.entities.length > 0;
    }
  }

  public start(): void {
    if(!this._canStart) {
      throw new Error(Errors.NoEntities);      
    }
    else {
      
    }
  }
}