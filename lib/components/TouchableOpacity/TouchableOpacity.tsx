import React, {FC} from "react";
import {View} from "@tarojs/components";
import {ITouchEvent} from "@tarojs/components/types/common";
import './TouchableOpacity.scss';

interface IProps {
    children?: any;
    className?: string;
    onPress: (event: ITouchEvent) => void;
    /**
     * 暂未实现
     */
    activeOpacity?: number;
    style?: string;
}

const TouchableOpacity:FC<IProps> = ({children, className, style, onPress})=>{
    return (
        <View
            className={`touchable-opacity ${className}`}
            onClick={onPress}
            style={`${style}`}
        >
            {children}
        </View>
    );
}

export default React.memo(TouchableOpacity);
