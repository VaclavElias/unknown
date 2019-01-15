import * as Controller from "./EntityController";
import IEntity from "./IEntity";
import Support from "./Support";
import Errors from "./Errors";
import Polyfill from "./Polyfill";

if(!Support.canUseTransformApi()) {
  throw new Error(Errors.NoTransfomApi);
}

Polyfill.initialize();

function EntityController(entity?: IEntity) {
  return new Controller.EntityController(entity);
}

export { 
  EntityController
};