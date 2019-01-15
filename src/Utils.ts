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
  };
}