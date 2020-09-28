const utils = require('../../../common/utils');

if (window.__globalAdapter) {
    let globalAdapter = window.__globalAdapter;
    // SystemInfo
    let systemInfo = my.getSystemInfoSync();
    let windowWidth = systemInfo.windowWidth;
    let windowHeight = systemInfo.windowHeight;
    let isLandscape = windowWidth > windowHeight;
    // TODO:
    globalAdapter.isSubContext = false;  // sub context not supported
    globalAdapter.isDevTool = window.navigator && (/AlipayIDE/.test(window.navigator.userAgent));
    utils.cloneMethod(globalAdapter, my, 'getSystemInfoSync');

    // TouchEvent
    // TouchEvent
    // my.onTouchStart register touch event listner on body
    // need to register on canvas
    globalAdapter.onTouchStart = function (cb) {
        window.canvas.addEventListener('touchstart', function (res) {
          cb && cb(res);
        });
    };
    globalAdapter.onTouchMove = function (cb) {
        window.canvas.addEventListener('touchmove', function (res) {
          cb && cb(res);
        });
    };
    globalAdapter.onTouchEnd = function (cb) {
        window.canvas.addEventListener('touchend', function (res) {
          cb && cb(res);
        });
    };
    globalAdapter.onTouchCancel = function (cb) {
        window.canvas.addEventListener('touchcancel', function (res) {
          cb && cb(res);
        });
    };

    // Audio
    globalAdapter.createInnerAudioContext = function() {
        let audio = my.createInnerAudioContext();
        audio.onCanplay = audio.onCanPlay.bind(audio);
        return audio;
    };

    // Keyboard
    utils.cloneMethod(globalAdapter, my, 'hideKeyboard');


    // SharedCanvas
    // TODO:
    // globalAdapter.getSharedCanvas = function () {
    //     return  my.createCanvasContext('canvas');
    // };
   


    // hide show Event
    globalAdapter.onShow = function (cb) {
        my.onAppShow(cb)
    };
    globalAdapter.onHide = function (cb) {
        my.onAppHide(cb)
    };

    // onError
    utils.cloneMethod(globalAdapter, my, 'onError');
    // offError
    utils.cloneMethod(globalAdapter, my, 'offError');

    // Accelerometer
    let isAccelerometerInit = false;
    let deviceOrientation = 1;

    // TODO:
    if (my.onDeviceOrientationChange) {
        my.onDeviceOrientationChange(function (res) {
            if (res.value === 'landscape') {
                deviceOrientation = 1;
            }
            else if (res.value === 'landscapeReverse') {
                deviceOrientation = -1;
            }
        });
    }

    Object.assign(globalAdapter, {
        startAccelerometer (cb) {
            if (!isAccelerometerInit) {
                isAccelerometerInit = true;
                my.onAccelerometerChange && my.onAccelerometerChange(function (res) {
                    let resClone = {};
                    let x = res.x;
                    let y = res.y;
                    if (isLandscape) {
                        let tmp = x;
                        x = -y;
                        y = tmp;
                    }

                    resClone.x = x * deviceOrientation;
                    resClone.y = y * deviceOrientation;
                    resClone.z = res.z;
                    cb && cb(resClone);
                });
            }
            else {

                // TODO:
                my.startAccelerometer && my.startAccelerometer({
                    fail (err) {
                        console.error('start accelerometer failed', err);
                    },
                    // success () {},
                    // complete () {},
                });
            }
        },

        stopAccelerometer () {
            // TODO:
            my.stopAccelerometer && my.stopAccelerometer({
                fail (err) {
                    console.error('stop accelerometer failed', err);
                },
                // success () {},
                // complete () {},
            });
        },
    });

}