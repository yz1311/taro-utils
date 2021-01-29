import {useRef} from 'react';
import YZFlatList from "../../components/YZFlatList";
import InteractionManager from "../interactionManager";


function useFlatListRef() {
    const flatListRef = useRef<YZFlatList>();

    /**
     * 刷新当前页
     */
    const refreshCurPage = ()=>{
        InteractionManager.runAfterInteractions(()=>{
            flatListRef.current && flatListRef.current.loadData();
        });
    }

    //刷新列表(pageIndex重置为1)
    const refreshList = ()=>{
        InteractionManager.runAfterInteractions(()=>{
            flatListRef.current && flatListRef.current.onRefresh();
        });
    }

    //下拉刷新列表(refreshEnable为false时无效)
    const pullRefreshList = ()=>{
        InteractionManager.runAfterInteractions(()=>{
            flatListRef.current && flatListRef.current.onPullRefresh();
        });
    }

    return {
        flatListRef,
        refreshCurPage,
        refreshList,
        pullRefreshList,
    };
}

export default useFlatListRef;
