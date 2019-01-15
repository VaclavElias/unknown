import Entity from "./Entity";

export default abstract class Support {
  private static readonly TransformApi = {
    Moz: function(entity: Entity, style: string) {
      (entity.element.style as any).MozTransform = style;
    },
    
    webkit: function(entity: Entity, style: string) {
      (entity.element.style as any).webkitTransform = style;
    },

    O: function(entity: Entity, style: string) {
      (entity.element.style as any).OTransform = style;
    },

    ms: function(entity: Entity, style: string) {
      (entity.element.style as any).msTransform = style;
    },

    Khtml: function(entity: Entity, style: string) {
      (entity.element.style as any).KhtmlTransform = style;
    },

    w3c: function(entity: Entity, style: string) {
      entity.element.style.transform = style;
    }
  };

  public static canUseTransformApi(): boolean {
    return (this.getTransformApi() !== null);
  }

  public static getTransformApi() {
    if('transform' in document.documentElement.style) {
      return this.TransformApi.w3c;
    }
    else {
      // feature detection for the other transforms:
      const vendors: string[] = ['Moz', 'webkit', 'O', 'ms', 'Khtml'];
      const count: number = vendors.length;

      for(let i = 0; i < count; i++) {
        if(`${vendors[i]}Transform` in document.documentElement.style) {
          return this.TransformApi[vendors[i]];
        }
      }
    }

    return null;
  }
}