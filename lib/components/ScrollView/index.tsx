
import React, {CSSProperties, FC} from 'react';
import {Omit, ScrollView as ScrollViewNative} from '@tarojs/components';
import './index.scss';
import CommonUtils from "../../utils/commonUtils";
import {ScrollViewProps} from "@tarojs/components/types/ScrollView";

type IProps = {
    style?: CSSProperties | Array<CSSProperties>;
    children?: React.ReactNode;
    /**
     * When false, the content does not scroll. The default value is true
     */
    scrollEnabled?: boolean; // true
    /**
     * When true the scroll view's children are arranged horizontally in a row
     * instead of vertically in a column. The default value is false.
     */
    horizontal?: boolean | null;
} & Omit<ScrollViewProps, "style">

const ScrollView:FC<IProps> = (props)=>{
    const {className, style, horizontal, scrollEnabled, ...rest} = props;
    let combinedStyle = CommonUtils.combineStyle(style);
    return (
        <ScrollViewNative
            {...rest}
            scrollX={scrollEnabled && horizontal}
            scrollY={scrollEnabled && !horizontal}
            //开启后无法滚动了
            // enableFlex={true}
            className={`custom-scroll-view ${className}`}
            style={combinedStyle}
        >
            {props.children}
        </ScrollViewNative>
    );
}

ScrollView.defaultProps = {
    scrollEnabled: true,
    horizontal: false
}

export default React.memo(ScrollView);