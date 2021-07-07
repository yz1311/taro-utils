
import React, {CSSProperties, FC} from 'react';
import {Omit, Text as TextNative} from '@tarojs/components';
import {TextProps} from "@tarojs/components/types/Text";
import {ITouchEvent} from "@tarojs/components/types/common";
import './index.scss';
import CommonUtils from "../../utils/commonUtils";

type IProps = {
    style?: CSSProperties | Array<CSSProperties>
    /**
     * Used to truncate the text with an ellipsis after computing the text
     * layout, including line wrapping, such that the total number of lines
     * does not exceed this number.
     *
     * This prop is commonly used with `ellipsizeMode`.
     */
    numberOfLines?: number;
    /**
     * This function is called on press.
     * Text intrinsically supports press handling with a default highlight state (which can be disabled with suppressHighlighting).
     */
    onPress?: (event: ITouchEvent) => void;
    children?: React.ReactNode;
} & Omit<TextProps, "style">

const Text:FC<IProps> = (props)=>{
    const {className, style, numberOfLines, onPress, onClick, ...rest} = props;
    const combinedStyle = CommonUtils.combineStyle(style);
    return (
        <TextNative
            {...rest}
            className={`custom-text ${className}`}
            style={combinedStyle}
            onClick={event => {
                onClick && onClick(event);
                onPress && onPress(event);
            }}
        >
            {props.children}
        </TextNative>
    );
}

export default React.memo(Text);