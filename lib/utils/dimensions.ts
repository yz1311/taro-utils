import Taro from '@tarojs/taro';
import {ScaledSize} from "../../types";

const Dimensions = {
    get: (dim: 'window' | 'screen')=>{
        let systemInfo = Taro.getSystemInfoSync();
        if(dim === 'window') {
            return {
                width: systemInfo.windowWidth,
                height: systemInfo.windowHeight,
                scale: systemInfo.pixelRatio,
                fontScale: 1
            } as ScaledSize;
        } else if(dim === 'screen') {
            return {
                width: systemInfo.screenWidth,
                height: systemInfo.screenHeight,
                scale: systemInfo.pixelRatio,
                fontScale: 1
            } as ScaledSize;
        } else {
            return {

            } as ScaledSize;
        }
    },
    addEventListener: (type: 'change', handler: ({ window, screen }: { window: ScaledSize; screen: ScaledSize }) => void)=>{
        Taro.offWindowResize(res => {
            Taro.onWindowResize(result => {
                let systemInfo = Taro.getSystemInfoSync();
                handler&&handler({
                    window: {
                        width: systemInfo.windowWidth,
                        height: systemInfo.windowHeight,
                        scale: systemInfo.pixelRatio,
                        fontScale: 1
                    },
                    screen: {
                        width: systemInfo.screenWidth,
                        height: systemInfo.screenHeight,
                        scale: systemInfo.pixelRatio,
                        fontScale: 1
                    }
                })
            });
        });
    },
    removeEventListener: (type: 'change', handler: ({ window, screen }: { window: ScaledSize; screen: ScaledSize }) => void)=>{
        Taro.offWindowResize(res => {

        });
    },
};

export default Dimensions;
