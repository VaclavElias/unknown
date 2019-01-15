import IEntity from "./IEntity";
import Utils from "./Utils";
import { Mode } from './EnumMode';
import Support from "./Support";

export default class Entity {
  private modes: Mode[] = [];

  public options: IEntity;
  public element: HTMLElement;public transform: Function;

  constructor(options?: IEntity) {
    this.options = Utils.mergeOptions(this.options, options);

    if(this.options.minEntities > this.options.maxEntities) {
      this.options.minEntities = this.options.maxEntities;
    }

    this.modes = [
      Mode.multiply,
      Mode.nothing
    ];

    if(this.options.canFly) {
      this.modes.push(
        Mode.fly,
        Mode.flyOff
      );
    }

    if(this.options.canDie) {
      this.modes.push(Mode.die);
    }

    if(this.modes.indexOf(this.options.mouseOver)) {
      this.options.mouseOver = Mode.random;
    }

    this.transform = Support.getTransformApi();

    let entitiesCount: number;

    if(this.options.mouseOver === Mode.multiply) {
      entitiesCount = this.options.minEntities;
    }
    else {
      entitiesCount = Utils.random(this.options.minEntities, this.options.maxEntities, true);
    }

    for(let i = 0; i < entitiesCount; i++) {
      const entityOptions = JSON.parse(JSON.stringify(this.options));
    }
  }

}