# taro-utils
[![npm version](http://img.shields.io/npm/v/@yz1311/taro-utils.svg?style=flat-square)](https://npmjs.org/package/@yz1311/taro-utils "View this project on npm")
[![npm version](http://img.shields.io/npm/dm/@yz1311/taro-utils.svg?style=flat-square)](https://npmjs.org/package/@yz1311/taro-utils "View this project on npm")

taro3的一些工具函数，主要针对从react native迁移到taro3的用户


## 工具

### FormData

小程序是默认不支持FormData对象的，单独由一个url来上传文件，通过这个拓展，可以直接从api接口上传文件
```javascript
import {FormData} from '@yz1311/taro-utils';
...
let formData = new FormData();
//uri是chooseImage返回的文件path属性
formData.appendFile('file', uri);
let formDataObj = formData.getData();

将`formDataObj.buffer`对象作为body传入即可
```

<font color="red">注意:</font> 在目前的开发者工具(截止到2021-03-02)中，会出现无法上传文件的问题，
因为官方的这个bug 
https://developers.weixin.qq.com/community/develop/doc/00068e2cc040a00f6a8b7e8b15bc00?highLine=arraybuffer
，真机不影响。暂时解决办法是进入库的`node_modules/@yz1311/taro-utils/lib/utils/formData/index.js`,注意是js文件,注销掉
```javascript
//    if (!(buffer instanceof ArrayBuffer)) {
//       return false;
//    }
```


### useCommonShare

通用的分享hooks

### useNavInfo

获取导航信息的hooks

### useMounted

延迟加载组件的hooks

初衷: `由于taro3的性能堪忧，所以很多地方都需要延迟加载，
譬如使用AtModal组件的时候,AtModal一般写在页面的最上层，刚进入页面的时候也会
随着页面加载，影响性能，所以需要延迟加载，但是每个页面都写setTimeout很繁琐，所以有了这个hooks`

### Alert

类RN的Alert组件，封装`Taro.showModal`

### CommonUtils

常用方法封装

### DeviceEventEmitter

全局事件接收和发送方法，类RN api，封装`Taro.eventCenter`

### InteractionManager

类RN api,实际只是延迟150ms，仅为方便RN代码迁移到taro3
```javascript
InteractionManager.runAfterInteractions(()=>{
            getTypeList();
        });
```

### NavigationHelper
导航帮助组件

提供了类似react-navigation的方法和一些自定义方法

* `isTopScreen：`根据页面路径返回当前页面是否在栈顶(不支持同一页面多实例)
* `goBack：`返回到上一级
* `navigate：`跳转，参数支持对象传参而不是小程序中的字符串,譬如:
  ```javascript
  NavigationHelper.push('/pages/leave/leaveForm', {
                              leaveId: item.id
                          });
  ```
* `push：`同navigate方法
* `resetTo：`重置到某一个页面(注意不支持tab页面)
* `switchTab：`跳转到tab页面
* `popN：`弹出N个页面
* `replace：`用新的页面替换当前页面(注意不支持tab页面)

### StorageUtils

存储工具类，提供了`save`、`load`、`remove`三个方法

### ToastUtils

toast和loading工具类，针对小程序中toast和loading的一些兼容性进行了封装

### Clipboard

### Dimensions

### Keyboard

### Platform

### useWindowDimensions


## 样式

### 自定义样式
主要是针对taro-ui中一些不合理的地方进行了覆盖修改
```
import '@yz1311/taro-utils/lib/style/index.scss';
```

### tachyons
tachyons是一个css库，推荐引入，可以少写很多css代码
```
import '@yz1311/taro-utils/lib/style/tachyons.min.css';
```

对应的RN端，推荐引入[react-native-style-tachyons](https://github.com/tachyons-css/react-native-style-tachyons)

## 组件

### YZButton

简单封装的Button组件

taro 3.0.14(至少是这个版本中存在这个问题)

Button组件在ios存在不占位的情况，并且有很大的阴影区域

### YZFloatLayout

### YZHeader
在`AtNavBar`基础上封装了两点
* 封装状态栏(状态栏和导航栏在YZHeader是一体的了)
* 隐藏返回按钮的时候，去掉按压效果
* title支持组件，并且扩大点击范围，方便对title自定义

### YZLIstItem

* desc默认支持多行
* 添加`required`属性

### YZFlatList

列表组件

<font color="red">注意:</font> 在目前的开发者工具(截止到2021-03-02)中，会出现下拉刷新的区域是整个列表的高度的问题,
导致三个点一直在列表的底部(list-item不设置背景色可以观察到)，也导致设置refresher-background相当于设置整个列表的背景色
因为官方的这个bug 
https://developers.weixin.qq.com/community/develop/doc/0000c4e49f43602a050b9748251000?highLine=scroll-view%2520refresher-background%2520%25E9%25AB%2598%25E5%25BA%25A6
，真机不影响

### YZLoadingFooter


### YZRadio

官方的列表是采用全列表渲染的，如果数据量较多，很影响渲染

现在改为VirtualList实现，性能极大优化


### YZTabs

目前官方的YZTabs中存在部分问题，内容区必须设置高度，无法利用flex充满屏幕

利用Swiper组件重新实现了该组件的大部分功能


### YZTextarea

由于众所周知的原生组件问题，使用Textarea组件会导致无法隐藏，目前该组件使用一个样式一样的占位组件替代，可以解决这个问题
