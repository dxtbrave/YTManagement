import { App } from "vue";
import registerElement from "./register-element";
import registerProperties from './register-properties'

export function globalRegister(app: App<Element>): void {
    // 按需引入element-plus组件
    app.use(registerElement)
    // 注册全局属性
    app.use(registerProperties)
}