import {App} from 'vue'
import 'element-plus/dist/index.css'
// import 'element-plus/lib/theme-chalk/index.css'
// import 'element-plus/lib/theme-chalk/base.css'

import {
    ElButton,
    ElCheckbox,
    ElForm,
    ElFormItem,
    ElInput,
    ElLink,
    ElRadio,
    ElTabPane,
    ElTabs,
    ElContainer,
    ElHeader,
    ElAside,
    ElMain,
    ElFooter,
    ElSubMenu,
    ElMenu,
    ElMenuItem,
    ElMenuItemGroup,
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    ElAvatar,
    ElRow,
    ElCol,
    ElSelect,
    ElOption,
    ElDatePicker,
    ElBreadcrumb,
    ElBreadcrumbItem


} from 'element-plus'

const components = [
    ElButton,
    ElForm,
    ElFormItem,
    ElInput,
    ElRadio,
    ElTabs,
    ElTabPane,
    ElCheckbox,
    ElLink,
    ElContainer,
    ElHeader,
    ElAside,
    ElMain,
    ElFooter,
    ElSubMenu,
    ElMenu,
    ElMenuItem,
    ElMenuItemGroup,
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    ElAvatar,
    ElRow,
    ElCol,
    ElSelect,
    ElOption,
    ElDatePicker,
    ElBreadcrumb,
    ElBreadcrumbItem
]

export default function (app: App): void {
    for (const component of components) {
        app.component(component.name, component)
    }
}