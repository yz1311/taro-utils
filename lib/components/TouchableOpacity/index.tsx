import React, {CSSProperties, FC} from "react";
import {Omit, View} from "@tarojs/components";
import {ITouchEvent} from "@tarojs/components/types/common";
import './index.scss';
import {ViewProps} from "@tarojs/components/types/View";
import CommonUtils from "../../utils/commonUtils";

type IProps = {
    onPress: (event: ITouchEvent) => void;
    /**
     * 暂未实现
     */
    activeOpacity?: number;
    style?: CSSProperties | Array<CSSProperties>;
    disabled?: boolean;
    children?: React.ReactNode;
} & Omit<ViewProps, "style">

const Index:FC<IProps> = (props)=>{
    const {className, style, disabled, onPress, ...rest} = props;
    const combinedStyle = CommonUtils.combineStyle(style);
    return (
        <View
            {...rest}
            className={`touchable-opacity ${className}`}
            onClick={!disabled&&onPress}
            style={combinedStyle}
        >
            {props.children}
        </View>
    );
}

export default React.memo(Index);
