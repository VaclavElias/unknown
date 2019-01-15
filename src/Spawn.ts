import Entity from "./Entity";

export default class Spawn {
  constructor() {
    let entity: Entity;

    for(let prop in Entity) {
      if(Entity.hasOwnProperty(prop)) {
        entity[prop] = Entity[prop];
      }
    }
    
    return entity;
  };
}