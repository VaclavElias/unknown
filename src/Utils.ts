import IDispatchOptions from "./IDispatchOptions";

export default abstract class Utils {
  // taken from https://github.com/igorskyflyer/clone.js
  static isArray(obj: object): boolean {
    return obj instanceof Array;
  }
  
  static isObject(obj: object): boolean {
    return typeof obj === 'object';
  }
  
  static isNull(obj: object): boolean {
    return typeof obj === null;
  }
  
  static clone(object) {
    let copy;
  
    if(this.isNull(object) || !this.isObject(object))
    return object;
  
    if(this.isArray(object)) {
    copy = [];
  
    for(let i = 0, count = object.length; i < count; i++)
      copy[i] = this.clone(object[i]);
  
    return copy;
    }
    else {
    copy = {};
  
    for(let key in object) {
      if(object.hasOwnProperty(key)) {
      if(!this.isObject(object[key]))
        copy[key] = object[key];
      else
        copy[key] = this.clone(object[key]);
      }
    }
    }
  
    return copy;
  }

  public static mergeOptions(obj1: object, obj2: object, clone: boolean = true): IDispatchOptions {
    const newObject = (clone) ? this.clone(obj1) : obj1;

    for(var key in obj2) {
      if(obj2.hasOwnProperty(key)) {
        newObject[key] = obj2[key];
      }
    }

    return <IDispatchOptions>newObject;
  };
}