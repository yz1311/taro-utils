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
import PixelRatio from "../lib/utils/pixelRatio";
import useNavInfo from "../lib/utils/hooks/useNavInfo";
import useCommonShare from "../lib/utils/hooks/useCommonShare";
import useMounted, {MountedDelays} from "../lib/utils/hooks/useMounted";
import useWindowDimensions from "../lib/utils/hooks/useWindowDimensions";
import useFlatListRef from "../lib/utils/hooks/useFlatListRef";
import StyleSheet from "../lib/utils/styleSheet";

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
import TouchableOpacity from "../lib/components/TouchableOpacity";
import Image from "../lib/components/Image";
import Text from "../lib/components/Text";
import View from "../lib/components/View";
import ScrollView from "../lib/components/ScrollView";

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
    PixelRatio,
    Alert,
    CommonUtils,
    DeviceEventEmitter,
    InteractionManager,
    NavigationHelper,
    StorageUtils,
    ToastUtils,
    StyleSheet,

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
    TouchableOpacity,
    Image,
    Text,
    View,
    ScrollView
}

//#region theme
export interface ThemeConfig {
    //General
    screenColor: string,
    primaryColor: string,
    secondaryColor: string,
    defaultColor: string,
    defaultTextColor: string,
    pageColor: string,
    pixelSize: number,

    //Label - color
    labelTextColor: string,
    labelTextTitleColor: string,
    labelTextDetailColor: string,
    labelTextDangerColor: string,
    //Label - font size
    labelFontSizeXL: number,
    labelFontSizeLG: number,
    labelFontSizeMD: number,
    labelFontSizeSM: number,
    labelFontSizeXS: number,
    labelTitleScale: number, //29, 22, 15, 11, 9
    labelDetailScale: number, //23, 18, 13, 9, 7
    labelDangerScale: number,

    //Button - background color
    btnColor: string,
    btnPrimaryColor: string,
    btnSecondaryColor: string,
    btnDangerColor: string,
    btnLinkColor: string,
    //Button - title color
    btnTitleColor: string,
    btnPrimaryTitleColor: string,
    btnSecondaryTitleColor: string,
    btnDangerTitleColor: string,
    btnLinkTitleColor: string,
    //Button - border color
    btnBorderColor: string,
    btnPrimaryBorderColor: string,
    btnSecondaryBorderColor: string,
    btnDangerBorderColor: string,
    btnLinkBorderColor: string,
    //Button - border width
    btnBorderWidth: number,
    //Button - border radius
    btnBorderRadiusXL: number,
    btnBorderRadiusLG: number,
    btnBorderRadiusMD: number,
    btnBorderRadiusSM: number,
    btnBorderRadiusXS: number,
    //Button - font size
    btnFontSizeXL: number,
    btnFontSizeLG: number,
    btnFontSizeMD: number,
    btnFontSizeSM: number,
    btnFontSizeXS: number,
    //Button - padding vertical
    btnPaddingVerticalXL: number,
    btnPaddingVerticalLG: number,
    btnPaddingVerticalMD: number,
    btnPaddingVerticalSM: number,
    btnPaddingVerticalXS: number,
    //Button - padding horizontal
    btnPaddingHorizontalXL: number,
    btnPaddingHorizontalLG: number,
    btnPaddingHorizontalMD: number,
    btnPaddingHorizontalSM: number,
    btnPaddingHorizontalXS: number,
    //Button - disabled opacity
    btnDisabledOpacity: number,

    //Checkbox
    cbTitleColor: string,
    cbFontSizeLG: number,
    cbFontSizeMD: number,
    cbFontSizeSM: number,
    cbTitlePaddingLeftLG: number,
    cbTitlePaddingLeftMD: number,
    cbTitlePaddingLeftSM: number,
    cbCheckedTintColor: string,
    cbUncheckedTintColor: string,
    cbIconSizeLG: number,
    cbIconSizeMD: number,
    cbIconSizeSM: number,
    cbDisabledOpacity: number,

    //Input
    inputColor: string,
    inputTextColor: string,
    inputPlaceholderTextColor: string,
    inputBorderColor: string,
    inputBorderWidth: number,
    //Input - border radius
    inputBorderRadiusLG: number,
    inputBorderRadiusMD: number,
    inputBorderRadiusSM: number,
    //Input - font size
    inputFontSizeLG: number,
    inputFontSizeMD: number,
    inputFontSizeSM: number,
    //Input - padding vertical
    inputPaddingVerticalLG: number,
    inputPaddingVerticalMD: number,
    inputPaddingVerticalSM: number,
    //Input - padding horizontal
    inputPaddingHorizontalLG: number,
    inputPaddingHorizontalMD: number,
    inputPaddingHorizontalSM: number,
    //Input - height
    inputHeightLG: number,
    inputHeightMD: number,
    inputHeightSM: number,
    //Input - disabled opacity
    inputDisabledOpacity: number,

    //Select
    selectColor: string,
    selectTextColor: string,
    selectPlaceholderTextColor: string,
    selectBorderColor: string,
    selectBorderWidth: number,
    //Select - border radius
    selectBorderRadiusLG: number,
    selectBorderRadiusMD: number,
    selectBorderRadiusSM: number,
    //Select - font size
    selectFontSizeLG: number,
    selectFontSizeMD: number,
    selectFontSizeSM: number,
    //Select - padding vertical
    selectPaddingTopLG: number,
    selectPaddingTopMD: number,
    selectPaddingTopSM: number,
    selectPaddingBottomLG: number,
    selectPaddingBottomMD: number,
    selectPaddingBottomSM: number,
    //Select - padding horizontal
    selectPaddingLeftLG: number,
    selectPaddingLeftMD: number,
    selectPaddingLeftSM: number,
    selectPaddingRightLG: number, //include icon size
    selectPaddingRightMD: number, //include icon size
    selectPaddingRightSM: number, //include icon size
    //Select - height
    selectHeightLG: number,
    selectHeightMD: number,
    selectHeightSM: number,
    //Select - icon
    selectIconSizeLG: number,
    selectIconSizeMD: number,
    selectIconSizeSM: number,
    selectIconTintColor: string,
    //Select - disabled opacity
    selectDisabledOpacity: number,

    //Stepper
    stepperColor: string,
    stepperBorderColor: string,
    stepperBorderWidth: number,
    stepperBorderRadius: number,
    stepperTextColor: string,
    stepperFontSize: number,
    stepperBtnTextColor: string,
    stepperBtnFontSize: number,
    stepperValueMinWidth: number,
    stepperValuePaddingHorizontal: number,
    stepperButtonWidth: number,
    stepperButtonHeight: number,
    stepperDisabledOpacity: number,

    //SearchInput
    siColor: string,
    siTextColor: string,
    siPlaceholderTextColor: string,
    siBorderColor: string,
    siBorderWidth: number,
    siBorderRadius: number,
    siFontSize: number,
    siPaddingVertical: number,
    siPaddingHorizontal: number,
    siHeight: number,
    siIconSize: number,
    siDisabledOpacity: number,

    //Badge
    badgeSize: number,
    badgeDotSize: number,
    badgePadding: number,
    badgeColor: string,
    badgeBorderColor: string,
    badgeBorderWidth: number,
    badgeTextColor: string,
    badgeFontSize: number,

    //Popover
    popoverColor: string,
    popoverBorderColor: string,
    popoverBorderRadius: number,
    popoverBorderWidth: number,
    popoverPaddingCorner: number,

    //NavigationBar
    navType: 'ios' | 'auto' | 'android', //'auto', 'ios', 'android'
    navStatusBarStyle: 'default' | 'light-content', //'default', 'light-content'
    navBarContentHeight: number,
    navColor: string,
    navTintColor: string,
    navTitleColor: string,
    navTitleFontSize: number,
    navButtonFontSize: number,
    navSeparatorColor: string,
    navSeparatorLineWidth: number,

    //SegmentedBar
    sbColor: string,
    sbHeight: number,
    sbBtnPaddingTop: number,
    sbBtnPaddingBottom: number,
    sbBtnPaddingLeft: number,
    sbBtnPaddingRight: number,
    sbBtnTitleColor: string,
    sbBtnTextFontSize: number,
    sbBtnActiveTitleColor: string,
    sbBtnActiveTextFontSize: number,
    sbIndicatorLineColor: string,
    sbIndicatorLineWidth: number,
    sbIndicatorPositionPadding: number,

    //SegmentedView

    //TabView
    tvBarColor: string,
    tvBarHeight: number,
    tvBarPaddingTop: number,
    tvBarPaddingBottom: number,
    tvBarSeparatorWidth: number,
    tvBarSeparatorColor: string,
    tvBarBtnWidth: number,
    tvBarBtnIconSize: number,
    tvBarBtnIconTintColor: string,
    tvBarBtnIconActiveTintColor: string,
    tvBarBtnTitleColor: string,
    tvBarBtnTextFontSize: number,
    tvBarBtnActiveTitleColor: string,
    tvBarBtnActiveTextFontSize: number,

    //ListRow
    rowColor: string,
    rowMinHeight: number,
    rowPaddingLeft: number,
    rowPaddingRight: number,
    rowPaddingTop: number,
    rowPaddingBottom: number,
    rowIconWidth: number,
    rowIconHeight: number,
    rowIconPaddingRight: number,
    rowAccessoryWidth: number,
    rowAccessoryHeight: number,
    rowAccessoryPaddingLeft: number,
    rowAccessoryCheckColor: string,
    rowAccessoryIndicatorColor: string,
    rowSeparatorColor: string,
    rowSeparatorLineWidth: number,
    rowPaddingTitleDetail: number,
    rowDetailLineHeight: number,
    rowActionButtonColor: string,
    rowActionButtonDangerColor: string,
    rowActionButtonTitleColor: string,
    rowActionButtonDangerTitleColor: string,
    rowActionButtonTitleFontSize: number,
    rowActionButtonPaddingHorizontal: number,

    //Carousel
    carouselDotSize: number,
    carouselDotUseSize: number,
    carouselDotColor: string,
    carouselActiveDotColor: string,

    //Wheel
    wheelColor: string,
    wheelFontSize: number,
    wheelTextColor: string,
    wheelHoleHeight: number,
    wheelHoleLineWidth: number,
    wheelHoleLineColor: string,
    wheelMaskColor: string,
    wheelMaskOpacity: number,

    //Overlay
    overlayOpacity: number,
    overlayRootScale: number,

    //Toast
    toastColor: string,
    toastPaddingLeft: number,
    toastPaddingRight: number,
    toastPaddingTop: number,
    toastPaddingBottom: number,
    toastBorderRadius: number,
    toastIconTintColor: string,
    toastIconWidth: number,
    toastIconHeight: number,
    toastIconPaddingTop: number,
    toastIconPaddingBottom: number,
    toastTextColor: string,
    toastFontSize: number,
    toastScreenPaddingLeft: number,
    toastScreenPaddingRight: number,
    toastScreenPaddingTop: number,
    toastScreenPaddingBottom: number,

    //ActionSheet
    asItemDisabledOpacity: number,
    asItemMinHeight: number,
    asItemPaddingLeft: number,
    asItemPaddingRight: number,
    asItemPaddingTop: number,
    asItemPaddingBottom: number,
    asItemColor: string,
    asItemSeparatorColor: string,
    asItemSeparatorLineWidth: number,
    asItemTitleColor: string,
    asItemTitleAlign: string,
    asItemFontSize: number,
    asCancelItemColor: string,
    asCancelItemSeparatorColor: string,
    asCancelItemSeparatorLineWidth: number,
    asCancelItemTitleColor: string,
    asCancelItemTitleAlign: string,
    asCancelItemFontSize: number,

    //ActionPopover
    apColor: string,
    apPaddingVertical: number,
    apPaddingHorizontal: number,
    apBorderRadius: number,
    apDirectionInsets: number,
    apItemTitleColor: string,
    apItemFontSize: number,
    apItemPaddingVertical: number,
    apItemPaddingHorizontal: number,
    apSeparatorColor: string,
    apSeparatorWidth: number,

    //PullPicker
    pupColor: string,
    pupMaxHeight: number,
    pupHeaderColor: string,
    pupHeaderPaddingLeft: number,
    pupHeaderPaddingRight: number,
    pupHeaderPaddingTop: number,
    pupHeaderPaddingBottom: number,
    pupHeaderTitleColor: string,
    pupHeaderFontSize: number,
    pupHeaderFontWeight: number,
    pupHeaderSeparatorColor: string,
    pupHeaderSeparatorHeight: number,
    pupItemColor: string,
    pupSeparatorColor: string,

    //PopoverPicker
    poppColor: string,
    poppShadowColor: string,
    poppMinWidth: number,
    poppMaxWidth: number,
    poppMinHeight: number,
    poppMaxHeight: number,
    poppDirectionInsets: number,
    poppItemColor: string,
    poppItemPaddingLeft: number,
    poppItemPaddingRight: number,
    poppItemPaddingTop: number,
    poppItemPaddingBottom: number,
    poppItemTitleColor: string,
    poppItemFontSize: number,
    poppItemSeparatorWidth: number,
    poppItemSeparatorColor: string,
    poppAccessoryWidth: number,
    poppAccessoryHeight: number,
    poppAccessoryPaddingLeft: number,
    poppAccessoryCheckColor: string,

    //Menu
    menuColor: string,
    menuShadowColor: string,
    menuDirectionInsets: number,
    menuItemColor: string,
    menuItemPaddingLeft: number,
    menuItemPaddingRight: number,
    menuItemPaddingTop: number,
    menuItemPaddingBottom: number,
    menuItemTitleColor: string,
    menuItemFontSize: number,
    menuItemSeparatorWidth: number,
    menuItemSeparatorColor: string,
    menuItemIconWidth: number,
    menuItemIconHeight: number,
    menuItemIconColor: string,
    menuItemIconPaddingRight: number,

    //ModalIndicator
    miIndicatorColor: string,
    miTextColor: string,
    miFontSize: number,
    miTextPaddingTop: number,
    miScreenPaddingLeft: number,
    miScreenPaddingRight: number,
    miScreenPaddingTop: number,
    miScreenPaddingBottom: number,

    //NavigationPage
    backButtonTitle: string,


    //additional
    designWidth: number;
    designHeight: number;
}

export type ThemeConfigPartial = Partial<ThemeConfig>;

export type Themes = {
    default: ThemeConfigPartial,
    black: ThemeConfigPartial,
    violet: ThemeConfigPartial,
};
export const Theme: {
    themes: {
        default: ThemeConfig,
        black: ThemeConfig,
        violet: ThemeConfig,
    };
    set: (theme:ThemeConfigPartial) => void;
    isPad: boolean;
    isIPhoneX: boolean;
    fitIPhoneX: boolean;
    isAndroid: boolean;
    isIOS: boolean;
    isLandscape: boolean;
    statusBarHeight: number;
    screenInset: {
        top: number,
        left: number,
        right: number,
        bottom: number
    };
    //设计宽度,默认为iphone6的375
    designWidth: number;
    //设计高度,默认为iphone6的1334
    designHeight: number;
    deviceWidth: number;
    deviceHeight: number;
    px2dp: (w:number)=>number;
    onePix: number;
    fontSizeAndColor: (size: number, color: ColorValue)=>Pick<TextStyle, "fontSize"|"color">;
    fontSizeColor: (size: number, color: ColorValue)=>Pick<TextStyle, "fontSize"|"color">;
    fontSizeColorWeight: (size: number, color: ColorValue, weight: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900')=>Pick<TextStyle, "fontSize"|"color"|"fontWeight">;
    widthHeight: (width: number | string, height: number | string)=>Pick<ViewStyle, "width"|"height">
} & ThemeConfigPartial;
//#endregion
