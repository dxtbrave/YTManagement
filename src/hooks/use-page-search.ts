import {ref} from "vue";
import PageContent from "@/components/page-content";

export function usePageSearch(){
    const pageContentRef = ref<InstanceType<typeof PageContent>>()
    const handleResetClick = () => {
        pageContentRef.value?.getPageData()
    }
    const handleQueryClick = (queryInfo:any) => {
        pageContentRef.value?.getPageData(queryInfo)
    }

    // 可以看成返回一个元组
    // 元组：数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。
    return [pageContentRef,handleResetClick,handleQueryClick]
}