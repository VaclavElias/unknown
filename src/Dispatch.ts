/** Unknown
 * Copyright, 2019.
 */

import IDispatchOptions from "./IDispatchOptions";
import Utils from "./Utils";
import { Mode } from './EnumMode';
import Polyfill from "./Polyfill";

// the main class that handles
export class Dispatch {
  public options: IDispatchOptions;
  public modes: Mode[] = [];

  public constructor(options: IDispatchOptions) {
    // can we transform?
    // this.transform = null;

    // // dont support transforms... quit
    // if (!this.transform) return;

    Polyfill.initialize();
    
    this.options = Utils.mergeOptions(this.options, options);

    // sanity check:
    if(this.options.minBugs > this.options.maxBugs) {
      this.options.minBugs = this.options.maxBugs;
    }

    this.modes = [
      Mode.multiply,
      Mode.fly
    ];

    if(this.options.canFly) {
      this.modes.push(Mode.fly, Mode.flyOff);
    }

    if(this.options.canDie) {
      this.modes.push(Mode.die);
    }

    if(this.modes.indexOf(this.options.mouseOver) == -1) {
        // invalid mode: use random:
        this.options.mouseOver = Mode.random;
    }
  }
}