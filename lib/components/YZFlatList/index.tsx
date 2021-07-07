/**
 * 初始加载或者下拉加载的时候显示refreshing
 * 上拉加载更多不显示
 */
import React, {Component, CSSProperties, PureComponent, ReactElement} from 'react';
import {
    createPagingResult,
    createReducerResult,
    dataToPagingResult,
    dataToReducerResult,
    PagingResult,
    ReducerResult
} from "@yz1311/taro-state-view";
import InteractionManager from "../../utils/interactionManager";
import View from '../View';
import Text from '../Text';
import ScrollView from '../ScrollView';
import {AtActivityIndicator as ActivityIndicator} from 'taro-ui';
import './index.scss';
import TouchableOpacity from "../TouchableOpacity";
import CommonUtils from "../../utils/commonUtils";

export type IProps =  {
    wrapperClassName?: string,
    style?: CSSProperties | Array<CSSProperties>,
    wrapperStyle?: CSSProperties | Array<CSSProperties>,
    listClassName?: string,
    listStyle?: CSSProperties | Array<CSSProperties>,
    contentClassName?: string,
    contentContainerStyle?: CSSProperties | Array<CSSProperties>,
    data?: ReadonlyArray<any>;
    /**
     * Takes an item from data and renders it into the list. Typical usage:
     * ```
     * _renderItem = ({item}) => (
     *   <TouchableOpacity onPress={() => this._onPress(item)}>
     *     <Text>{item.title}</Text>
     *   <TouchableOpacity/>
     * );
     * ...
     * <FlatList data={[{title: 'Title Text', key: 'item1'}]} renderItem={this._renderItem} />
     * ```
     * Provides additional metadata like `index` if you need it.
     */
    renderItem: ({item: any, index: number}) => (React.ReactElement | null) | null | undefined;
    /**
     * 分页大小
     */
    pageSize?: number;
    totalCount: number,
    /**
     * 如果需要在外部调用，可以传入外部的该值
     */
    pagingResult?: PagingResult;
    loadData: (pageIndex: number, pageSize?: number) => Promise<Array<any> | Error>,
    clearData?: any,
    onPageIndexChange?: any,
    footerContainerStyle?: CSSProperties | Array<CSSProperties>,
    footerTextStyle?: CSSProperties | Array<CSSProperties>,
    refreshEnable: boolean;
    /**
     * 下拉刷新(refreshEnable为false时无效)
     */
    onPullRefresh?: () => void;
    onPagingResultChange?: (result: PagingResult<any>) => void;
    ListHeaderComponent?: Function | ReactElement | Component,
    ListFooterComponent?: Function | ReactElement | Component,
    ItemSeparatorComponent?:  Function | ReactElement | Component,
    /**
     * 挂载列表的时候，自动加载数据,默认:true
     */
    autoload?: boolean;
    /**
     * 自动挂载列表的方式
     * pull下拉刷新，跟手动下拉刷新的效果一致(refreshEnable为false时无效)
     * mute隐藏，只调用接口
     */
    autoloadType: 'pull' | 'mute',
    keyExtractor?: (item: any, index: number) => string;
};

export interface IState {
    isRefreshing: boolean;
    pagingResult: PagingResult;
    //可能需要显示第几页，所以在state中也加入该属性
    pageIndex: number;
    refresherEnabled: boolean;
}

export default class YZFlatList extends PureComponent<IProps, IState> {
    //表示当前正在加载更多数据
    isLoadingMore = false;
    pageIndex = 1;

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            pagingResult: createPagingResult(),
            pageIndex: 1,
            refresherEnabled: true
        };
    }

    static defaultProps = {
        totalCount: -1,
        pageSize: 10,
        refreshEnable: true,
        autoload: true,
        autoloadType: 'mute'
    };

    private flatList: any;

    componentDidMount() {
        //由于有AMStateView的存在，所以放在外面触发
        if (this.props.autoload) {
            InteractionManager.runAfterInteractions(()=>{
                switch (this.props.autoloadType) {
                    case 'pull':
                        this.onPullRefresh();
                        break;
                    case 'mute':
                        console.log('auto load')
                        this.loadData();
                        break;
                }
            });
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.pagingResult !== prevState.pagingResult) {
            if (nextProps.pagingResult) {
                return {
                    pagingResult: nextProps.pagingResult
                };
            }
        }
        // 否则，对于state不进行任何操作
        return null;
    }

    componentWillUnmount() {
        const {clearData} = this.props;
        clearData && clearData();
    }

    _onScroll = () => {
        // console.log('_onScroll');
        //滑动一下就可以重新触发_onEndReach了
        if (this.isLoadingMore) {
            this.isLoadingMore = false;
        }
    }

    /**
     * 调用接口刷新(pageIndex会被重置为1)
     */
    onRefresh = async () => {
        await this.loadData(1);
    }

    /**
     * 触发下拉刷新
     */
    onPullRefresh = async ()=>{
        //下拉刷新的时候不会再次触发下拉刷新
        if (this.state.isRefreshing) {
            return;
        }
        this.props.onPullRefresh && this.props.onPullRefresh();
        this.setState({
            isRefreshing: true,
        });
        await this.onRefresh();
        this.setState({
            isRefreshing: false,
        });
    }

    _onEndReach = async () => {
        const {pagingResult: {noMore}} = this.state;
        console.log('YZFlatList  _onEndReach noMore:' + noMore + '  isLoadingMore:' + this.isLoadingMore);
        if (!this.isLoadingMore) {
            //继续加载下面的
            if (!noMore) {
                //必须要禁用，否则加载下一页数据的时候，页面会跳一下
                this.setState({
                    refresherEnabled: false
                });
                // onReachEnd&&onReachEnd();
                await this.loadData(this.pageIndex);
            }
        }
    }


    render() {
        const {pagingResult: {dataList, noMore}, refresherEnabled} = this.state;
        const {ListHeaderComponent, wrapperClassName, wrapperStyle, style,
            listClassName, listStyle, renderItem, ItemSeparatorComponent,
            contentClassName, contentContainerStyle} = this.props;
        return (
            <View className={`yz-list-view ${wrapperClassName}`} style={[CommonUtils.combineStyle(style), CommonUtils.combineStyle(wrapperStyle)]}>
                <ScrollView className={`list-scroll-view ${listClassName}`}
                            style={listStyle}
                            onScroll={this._onScroll}
                            refresherEnabled={this.props.refreshEnable!==true ? false : refresherEnabled}
                            refresherThreshold={80}
                            refresherDefaultStyle="black"
                            refresherBackground="transparent"
                            refresherTriggered={this.state.isRefreshing}
                            onRefresherRefresh={()=>{
                                //下拉会触发该方法，但是设置refresherTriggered也会触发该方法
                                if(this.isLoadingMore) {
                                    return;
                                }
                                this.onPullRefresh&&this.onPullRefresh();
                            }}
                            onRefresherPulling={()=>{

                            }}
                            scrollY={true}
                            onScrollToLower={this._onEndReach}
                >
                    <View className={`yz-list-view__content ${contentClassName}`} style={contentContainerStyle} >
                        {typeof ListHeaderComponent == 'function' ?
                            ListHeaderComponent()
                            :
                            ListHeaderComponent
                        }
                        {
                            dataList.map((item,index)=>{
                                return (
                                    <React.Fragment key={this._keyExtractor(item, index)}>
                                        {renderItem&&renderItem({
                                            item,
                                            index
                                        })}
                                        {
                                            index != dataList.length-1 ?
                                                typeof ItemSeparatorComponent == 'function' ?
                                                    ItemSeparatorComponent()
                                                    :
                                                    ItemSeparatorComponent
                                                :
                                                null
                                        }
                                    </React.Fragment>
                                );
                            })
                        }
                        {this._renderFooter()}
                    </View>
                </ScrollView>
            </View>
        );
    }

    _keyExtractor = (item, index) => {
        //key是根据keyExtractor获取而来
        let tempKeyExtractor = null as any;
        if(this.props.keyExtractor) {
            tempKeyExtractor = this.props.keyExtractor
        } else {
            if(item.hasOwnProperty('key')) {
                tempKeyExtractor = (item, index)=>item['key']+'';
            } else  if(item.hasOwnProperty('id')) {
                tempKeyExtractor = (item, index)=>item['id']+'';
            } else {
                tempKeyExtractor = (item, index)=>index+'';
            }
        }
        return tempKeyExtractor(item, index);
    }

    _renderFooter = () => {
        const {ListFooterComponent, footerContainerStyle, footerTextStyle} = this.props;
        if(ListFooterComponent) {
            return (
                typeof ListFooterComponent == 'function' ?
                    ListFooterComponent()
                    :
                    ListFooterComponent
            );
        }
        const {pagingResult: {loadDataResult, noMore}} = this.state;
        let promptTitle = noMore ? '没有更多内容了' : '加载中...';
        let textColor = '#666';
        //不是第一页加载错误，则在底部footer显示重新加载按钮，点击并重新加载
        let isNotFirstLoadError = (!this.isLoadingMore) && this.pageIndex > 1 && loadDataResult.error != undefined;
        if (isNotFirstLoadError) {
            promptTitle = '重新加载';
            textColor = '#3092BE';
        }
        return (
            <TouchableOpacity
                onPress={() => {
                    if (!isNotFirstLoadError) {
                        return;
                    }
                    this._onEndReach();
                }}
                className="yz-list-view__bottom"
                style={footerContainerStyle}>
                {noMore || isNotFirstLoadError ? null :
                    <ActivityIndicator className="indicator" color={'#666666'} />}
                    <Text style={{
                        textAlign: 'center',
                        color: textColor,
                        fontSize: (isNotFirstLoadError ? 15 : 13) + 'px',
                        ...footerTextStyle}}>{promptTitle}</Text>
            </TouchableOpacity>
        );
    }


    loadData = async (pageIndex = 1, pageSize = this.props.pageSize) => {
        if (this.isLoadingMore) {
            return;
        }
        this.isLoadingMore = true;
        const {loadData} = this.props;
        let dataResult = await (loadData && loadData(pageIndex, pageSize));
        this.isLoadingMore = false;
        let nextPagingResult = this.state.pagingResult;
        //说明报错了
        if (dataResult instanceof Error) {
            nextPagingResult = {
                ...nextPagingResult,
                loadDataResult: dataToReducerResult(dataResult, this.pageIndex)
            }
        } else if (Array.isArray(dataResult)) {
            let pagingResult = dataToPagingResult(this.state.pagingResult.dataList, (dataResult || []) as Array<any>, pageIndex, pageSize);
            nextPagingResult = pagingResult;
            //dataToPagingResult已对pageIndex做了判断，数据为空时不会自增
            this.pageIndex = pagingResult.pageIndex;
        } else if(dataResult) {
            //说明返回的是PagingResult对象
            if((dataResult as PagingResult).loadDataResult != undefined) {
                nextPagingResult = dataResult as PagingResult;
                //dataToPagingResult已对pageIndex做了判断，数据为空时不会自增
                this.pageIndex = nextPagingResult.pageIndex;
            } else {
                console.warn('YZFlatList loadData  return value not support simple object');
            }
        } else {
            // console.warn('YZFlatList loadData must return value');
            nextPagingResult = {
                ...this.state.pagingResult,
                loadDataResult: dataToReducerResult(dataResult)
            };
        }
        if (this.state.pagingResult !== nextPagingResult) {
            this.setState({
                pagingResult: nextPagingResult,
            });
            this.props.onPagingResultChange && this.props.onPagingResultChange(nextPagingResult);
        }
    }


    onPageIndexChange = (pageIndex = this.pageIndex) => {
        const {onPageIndexChange} = this.props;
        onPageIndexChange && onPageIndexChange(pageIndex);
    }
}
