import IEntity from "./IEntity";

export default abstract class Utils {
  public static clone(obj: object): object {
    return { ...obj };
  }

  public static mergeOptions(firstObject: object, secondObject: object, clone: boolean = true): IEntity {
    const newObject = (clone) ? this.clone(firstObject) : firstObject;

    for(const key in secondObject) {
      if(secondObject.hasOwnProperty(key)) {
        newObject[key] = secondObject[key];
      }
    }

    return <IEntity>newObject;
  }

  public static mergeEntities(firstObject: object, secondObject: object, clone: boolean = true): IEntity {
    const newObject = (clone) ? this.clone(firstObject) : firstObject;

    for(const key in secondObject) {
      if(secondObject.hasOwnProperty(key)) {
        newObject[key] = secondObject[key];
      }
    }

    return <IEntity>newObject;
  }

  public static random(min: number, max: number, round: boolean = false): number {
    if(min === max) {
      if(round) {
        return Math.round(min);
      }
      else {
        return min;
      }
    }

    let result: number = ((min - 0.5) + (Math.random() * (max - min + 1)));

    if(result > max) {
      result = max;
    }
    else
    if(result < min) {
      result = min;
    }
    
    return ((round) ? Math.round(result) : result);
  } 
}