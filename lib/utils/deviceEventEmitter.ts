import Taro from '@tarojs/taro';
import {EmitterSubscription} from "../../types";


const DeviceEventEmitter =  {
    addListener: (eventName: string | symbol, params: any) => {
        Taro.eventCenter.on(eventName, params);
        return {
            eventType: eventName,
            remove: () => {
                Taro.eventCenter.off(eventName, params);
            }
        } as EmitterSubscription;
    },
    emit: (eventName: string, params?: any) => {
        Taro.eventCenter.trigger(eventName, params);
    }
}


export default DeviceEventEmitter;
