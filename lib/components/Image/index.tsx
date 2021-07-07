

import React, {CSSProperties, FC} from 'react';
import {Image as ImageNative} from '@tarojs/components';
import './index.scss';
import CommonUtils from "../../utils/commonUtils";

export declare type Source = {
    uri?: string;
    headers?: {
        [key: string]: string;
    };
    // priority?: Priority;
    cache?: Cache;
};

export declare type ResizeMode = 'contain' | 'cover' | 'stretch' | 'center';

export interface OnLoadEvent {
    nativeEvent: {
        width: number;
        height: number;
    };
}

interface IProps {
    style?: CSSProperties | Array<CSSProperties>
    className?: string;
    source: Source | number;
    tintColor?: number | string;
    resizeMode?: ResizeMode;
    onLoad?(event: OnLoadEvent): void;
    onError?(): void;
    onLoadEnd?(): void;
}

const Image:FC<IProps> = ({style, className, children,
                              onLoad, onError, onLoadEnd,
                              source})=>{
    const combinedStyle = CommonUtils.combineStyle(style);
    return (
        <ImageNative
            className={`custom-image ${className}`}
            style={combinedStyle}
            //跟rn中不同，web中require最终变成的不是number，而是string，图片的绝对路径
            src={(source as Source)?.uri || source as string}
            onLoad={e=>{
                onLoad && onLoad({
                    nativeEvent: {
                        width: e.detail.width as number,
                        height: e.detail.height as number
                    }
                });
                onLoadEnd && onLoadEnd();
            }}
            onError={e=>{
                onError && onError();
            }}
        />
    );
}

export default React.memo(Image);