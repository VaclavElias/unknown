export default abstract class Polyfill {
  public static initialize() {
    (<any>window).requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        (<any>window).mozRequestAnimationFrame ||
        (<any>window).oRequestAnimationFrame ||
        (<any>window).msRequestAnimationFrame || function( /* function */ callback: Function, /* DOMElement */ element: Element) {
          window.setTimeout(callback, 1000 / 60);
        };
    })();
  }
}