const { screenWidth, screenHeight, pixelRatio } = my.getSystemInfoSync()


/*
 {
   fontSizeSetting: 17, 
   system: "13.6.1", 
   version: "9.8.0",
   brand: "iPhone",
   currentBattery: "89%",
   windowHeight: 724, 
   pixelRatio: 3, 
   platform: "iOS", 
   screenHeight: 812,
   statusBarHeight: 44,
   language: "en",
   storage: "59.55 GB",
   app: "TB",
   titleBarHeight: 44,
   model: "iPhone10,3",
   screenWidth: 375,
   windowWidth: 375,
   isIphoneXSeries: true
}
 */

export const innerWidth = screenWidth
export const innerHeight = screenHeight
export const devicePixelRatio = pixelRatio
export const screen = {
  width: screenWidth,
  height: screenHeight,
  availWidth: innerWidth,
  availHeight: innerHeight,
  availLeft: 0,
  availTop: 0,
}

export const performance = {
  now: Date.now
};

export const ontouchstart = null;
export const ontouchmove = null;
export const ontouchend = null;