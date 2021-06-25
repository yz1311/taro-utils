import Alert from '../lib/utils/alert';
import CommonUtils from '../lib/utils/commonUtils';
import DeviceEventEmitter from '../lib/utils/deviceEventEmitter';
import InteractionManager from '../lib/utils/interactionManager';
import NavigationHelper from '../lib/utils/navigationHelper';
import StorageUtils from '../lib/utils/storageUtils';
import ToastUtils from '../lib/utils/toastUtils';
import FormData from "../lib/utils/formData";
import Clipboard from "../lib/utils/clipboard";
import Platform from "../lib/utils/platform";
import Keyboard from "../lib/utils/keyboard";
import Dimensions from "../lib/utils/dimensions";
import useNavInfo from "../lib/utils/hooks/useNavInfo";
import useCommonShare from "../lib/utils/hooks/useCommonShare";
import useMounted, {MountedDelays} from "../lib/utils/hooks/useMounted";
import useWindowDimensions from "../lib/utils/hooks/useWindowDimensions";
import useFlatListRef from "../lib/utils/hooks/useFlatListRef";


import YZButton from "../lib/components/YZButton";
import YZListItem from "../lib/components/YZListItem";
import YZFlatList from "../lib/components/YZFlatList";
import YZLoadingFooter from "../lib/components/YZLoadingFooter";
import YZTabs from "../lib/components/YZTabs";
import YZTextarea from "../lib/components/YZTextarea";
import YZHeader from "../lib/components/YZHeader";
import YZFloatLayout from "../lib/components/YZFloatLayout";
import YZRadio from "../lib/components/YZRadio";
import YZField from "../lib/components/YZField";
import TouchableOpacity from "../lib/components/TouchableOpacity/TouchableOpacity";

// Used by Dimensions below
export interface ScaledSize {
    width: number;
    height: number;
    scale: number;
    fontScale: number;
}

export interface EmitterSubscription {
    eventType: string;
    remove: ()=>void;
}

export {
    useNavInfo,
    useCommonShare,
    useMounted,
    MountedDelays,
    useWindowDimensions,
    useFlatListRef,
    FormData,
    Clipboard,
    Platform,
    Keyboard,
    Dimensions,
    Alert,
    CommonUtils,
    DeviceEventEmitter,
    InteractionManager,
    NavigationHelper,
    StorageUtils,
    ToastUtils,

    YZButton,
    YZListItem,
    YZFlatList,
    YZLoadingFooter,
    YZTabs,
    YZTextarea,
    YZHeader,
    YZFloatLayout,
    YZRadio,
    YZField,
    TouchableOpacity
}
