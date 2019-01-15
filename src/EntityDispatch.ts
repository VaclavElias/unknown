/** Unknown
 * Copyright, 2019.
 */

import IEntity from "./IEntity";
import Errors from "./Errors";
import Support from "./Support";
import Utils from "./Utils";
import { Mode } from "./EnumMode";
import Entity from "./Entity";
import Spawn from "./Spawn";

//
export class EntityDispatch {
  private transform: Function = Support.getTransformApi();

  private _isActive: boolean = false;
  private _canStart: boolean = false;

  public get isActive(): boolean {
    return this._isActive;
  };

  public get canStart(): boolean {
    return this._canStart;
  }

  public options: IEntity;
  public modes: Mode[];
  public bugs: Entity[];

  constructor(options: IEntity) {
    this.options = Utils.mergeOptions(this.options, options);

    // sanity check:
    if (this.options.minEntities > this.options.maxEntities) {
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

    if(this.modes.indexOf(this.options.mouseOver) == -1) {
        // invalid mode: use random:
        this.options.mouseOver = Mode.random;
    }

    // can we transform?
    this.transform = Support.getTransformApi();

    // make bugs:
    this.bugs = [];

    let numBugs: number;
    
    if(this.options.mouseOver === Mode.multiply) {
      numBugs = this.options.minEntities;
    }
    else {
      numBugs = Utils.random(this.options.minEntities, this.options.maxEntities, true);
    }
    
    const that = this;

    for(let i = 0; i < numBugs; i++) {
      const newOptions = JSON.parse(JSON.stringify(this.options));
      const b = new Spawn();

        options.wingsOpen = (this.options.canFly) ? ((Math.random() > 0.5) ? true : false) : true,
            options.walkSpeed = Utils.random(this.options.minSpeed, this.options.maxSpeed),

            b.initialize(this.transform, options);
        this.bugs.push(b);
    }

    // fly them in staggered:
    this.spawnDelay = [];
    for (i = 0; i < numBugs; i++) {
        var delay = Utils.random(this.options.minDelay, this.options.maxDelay, true),
            thebug = this.bugs[i];
        // fly the bug onto the page:
        this.spawnDelay[i] = setTimeout((function(thebug) {
            return function() {
                if (that.options.canFly) {
                    thebug.flyIn();
                } else {
                    thebug.walkIn();
                }

            };
        }(thebug)), delay);

        // add mouse over events:
        that.add_events_to_bug(thebug);
    }

    // add window event if required:
    if (this.options.monitorMouseMovement) {
        window.onmousemove = function() {
            that.check_if_mouse_close_to_bug();
        };
    }

}

  private stop() {
    for (var i = 0; i < this.bugs.length; i++) {
      if(this.spawnDelay[i]) {
        clearTimeout(this.spawnDelay[i]);
      }
      
      this.bugs[i].stop();
    }
  }

  private end() {
    for (var i = 0; i < this.bugs.length; i++) {
      if(this.spawnDelay[i]) {
        clearTimeout(this.spawnDelay[i]);
      }

      this.bugs[i].stop();
      this.bugs[i].remove();
    }
  }

  private reset() {
    this.stop();

    for(var i = 0; i < this.bugs.length; i++) {
      this.bugs[i].reset();
      this.bugs[i].walkIn();
    }
  }

  private killAll() {
    for(var i = 0; i < this.bugs.length; i++) {
      if(this.spawnDelay[i]) {
        clearTimeout(this.spawnDelay[i]);
      }

      this.bugs[i].die();
    }
  }

  private add_events_to_bug(thebug) {
    var that = this;
    if(thebug.bug) {
      if(thebug.bug.addEventListener) {
        thebug.bug.addEventListener('mouseover', function(e) {
          that.on_bug(thebug);
        });
      }
      else
      if(thebug.bug.attachEvent) {
        thebug.bug.attachEvent('onmouseover', function(e) {
          that.on_bug(thebug);
        });
      }
    }
  }

  private check_if_mouse_close_to_bug(e) {
    e = e || window.event;
    if (!e) {
      return;
    }

    var posx = 0,
        posy = 0;
    if (e.client && e.client.x) {
        posx = e.client.x;
        posy = e.client.y;
    } else if (e.clientX) {
        posx = e.clientX;
        posy = e.clientY;
    } else if (e.page && e.page.x) {
        posx = e.page.x - (document.body.scrollLeft + document.documentElement.scrollLeft);
        posy = e.page.y - (document.body.scrollTop + document.documentElement.scrollTop);
    } else if (e.pageX) {
        posx = e.pageX - (document.body.scrollLeft + document.documentElement.scrollLeft);
        posy = e.pageY - (document.body.scrollTop + document.documentElement.scrollTop);
    }
    var numBugs = this.bugs.length,
        i = 0;
    for (i = 0; i < numBugs; i++) {
        var pos = this.bugs[i].getPos();
        if (pos) {
            if (Math.abs(pos.top - posy) + Math.abs(pos.left - posx) < this.options.eventDistanceToBug && !this.bugs[i].flyperiodical) {
                this.near_bug(this.bugs[i]);
            }
        }
    }
  }

  private near_bug(bug) {
    this.on_bug(bug);
  }

  private on_bug(bug) {
    if(!bug.alive) {
      return;
    }

    var mode = this.options.mouseOver;

    if (mode === 'random') {
        mode = this.modes[(Utils.random(0, (this.modes.length - 1), true))];
    }

    if (mode === 'fly') {
        // fly away!
        bug.stop();
        bug.flyRand();
    } else if (mode === 'nothing') {
        return;
    } else if (mode === 'flyoff') {
        // fly away and off the page
        bug.stop();
        bug.flyOff();
    } else if (mode === 'die') {
        // drop dead!
        bug.die();
    } else if (mode === 'multiply') {
        if (!this.multiplyDelay && this.bugs.length < this.options.maxBugs) {
            // spawn another: 
            // create new bug:
            var b = new Spawn(),
                options = JSON.parse(JSON.stringify(this.options)),
                pos = bug.getPos(),
                that = this;

            options.wingsOpen = (this.options.canFly) ? ((Math.random() > 0.5) ? true : false) : true;
            options.walkSpeed = Utils.random(this.options.minSpeed, this.options.maxSpeed);

            b.initialize(this.transform, options);
            b.drawBug(pos.top, pos.left);
            // fly them both away:
            if (options.canFly) {
                b.flyRand();
                bug.flyRand();
            } else {
                b.go();
                bug.go();
            }
            // store new bug:
            this.bugs.push(b);
            // watch out for spawning too quickly:
            this.multiplyDelay = true;
            setTimeout(function() {
                // add event to this bug:
                that.add_events_to_bug(b);
                that.multiplyDelay = false;
            }, this.options.minTimeBetweenMultipy);
        }

    }
  }
}