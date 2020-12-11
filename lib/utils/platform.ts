import Taro from '@tarojs/taro';

const Platform = {
    OS: (()=>{
        let systemInfo = Taro.getSystemInfoSync();
        //虽然说网上说的是模拟器获取的system是devtools,但是实际测试 iOS 10.0.1
        let system = systemInfo.system?.toLowerCase();
        if(system.indexOf('ios')>=0) {
            return 'ios';
        } else if(system.indexOf('android')>=0) {
            return 'android';
        } else if(system.indexOf('devtools')>=0 || process.env.TARO_ENV === 'h5') {
            return 'web';
        } else {
            return system;
        }
    })(),
};


export default Platform;
