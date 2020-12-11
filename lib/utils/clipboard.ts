import Taro from '@tarojs/taro';

const Clipboard = {
    getString: ()=>{
        return new Promise<string>(async (resolve, reject) => {
            try {
                let response = await Taro.getClipboardData();
                resolve(response.data);
            } catch (e) {
                reject(e);
            }
        });
    },
    setString: (content: string)=>{
        return new Promise<void>(async (resolve, reject) => {
            try {
                await Taro.setClipboardData({
                    data: content
                });
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }
};


export default Clipboard;
