import Taro from '@tarojs/taro';

const Keyboard = {
    dismiss: ()=>{
        Taro.hideKeyboard();
    }
};


export default Keyboard;
