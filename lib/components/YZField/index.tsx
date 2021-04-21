import React, {FC} from 'react'
import {Image, Text, View, Input} from "@tarojs/components";
import './index.scss';
import {ITouchEvent} from "@tarojs/components/types/common";


interface IProps {
    className?: string,
    thumb?: string;
    title: string|JSX.Element,
    extraMultiline?: boolean;
    required?: boolean,
    note?: string,
    arrow?: 'up' | 'down' | 'right',
    hasBorder?: boolean;
    value: string;
    onChangeText: (text: string)=>void;
    placeholder?: string;
}

const YZListItem: FC<IProps> = ({className, title,
                                    thumb, extraMultiline,
                                    value, onChangeText, placeholder,
                                    note, required, arrow, hasBorder = true})=>{
    return (
        <View className={`yz-field at-list__item ${!arrow&&'at-list__item_patch'} ${!hasBorder&&'at-list__item--no-border'} ${className}`}>
            <View className='at-list__item-container at-list__item-container_patch'>
                {thumb && (
                    <View className='at-list__item-thumb item-thumb'>
                        <Image
                            className='item-thumb__info'
                            mode='scaleToFill'
                            src={thumb}
                        />
                    </View>
                )}
                <View className='at-list__item-content item-content'>
                    <View className='item-content__info'>
                        <View className={`item-content__info-title ${required && 'at-input__title--required'}`}>{title}</View>
                        {note && <View className='item-content__info-note'>{note}</View>}
                    </View>
                </View>
                <View className="right-container">
                    <Input
                        className="input"
                        value={value}
                        placeholder={placeholder}
                        onInput={e => {
                            onChangeText && onChangeText(e.detail.value);
                            return e.detail.value;
                        }}
                    />
                </View>
            </View>
        </View>
    );
}

YZListItem.defaultProps = {
    //默认支持多行
    extraMultiline: true,
    placeholder: '请输入'
};

export default React.memo(YZListItem);
