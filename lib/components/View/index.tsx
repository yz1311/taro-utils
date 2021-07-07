
import React, {CSSProperties, FC} from 'react';
import {Omit, View as ViewNative} from '@tarojs/components';
import './index.scss';
import {ViewProps} from "@tarojs/components/types/View";
import CommonUtils from "../../utils/commonUtils";

type IProps = {
    style?: CSSProperties | Array<CSSProperties>;
    children?: React.ReactNode;
} & Omit<ViewProps, "style">

const View:FC<IProps> = (props)=>{
    const {className, style, ...rest} = props;
    let combinedStyle = CommonUtils.combineStyle(style);
    return (
        <ViewNative
            {...rest}
            className={`custom-view ${className}`}
            style={combinedStyle}
        >
            {props.children}
        </ViewNative>
    );
}

export default React.memo(View);