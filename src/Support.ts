export default abstract class Support {
//   private static readonly TransformApi = {
//     'Moz': function(s) {
//         this.bug.style.MozTransform = s;
//     },
//     'webkit': function(s) {
//         this.bug.style.webkitTransform = s;
//     },
//     'O': function(s) {
//         this.bug.style.OTransform = s;
//     },
//     'ms': function(s) {
//         this.bug.style.msTransform = s;
//     },
//     'Khtml': function(s) {
//         this.bug.style.KhtmlTransform = s;
//     },
//     'w3c': function(s) {
//         this.bug.style.transform = s;
//     }
// };

//   public static canUseTransformApi(): boolean {
//     if ('transform' in document.documentElement.style) {
//       this.transform = this.transforms.w3c;
//   } else {

//       // feature detection for the other transforms:
//       var vendors = ['Moz', 'webkit', 'O', 'ms', 'Khtml'],
//           i = 0;

//       for (i = 0; i < vendors.length; i++) {
//           if (vendors[i] + 'Transform' in document.documentElement.style) {
//               this.transform = this.transforms[vendors[i]];
//               break;
//           }
//       }
//   }
// }

  public static getTransformApi() {

  }
}