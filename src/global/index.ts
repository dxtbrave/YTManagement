import { App } from "vue";
import registerElement from "./register-element";

export function globalRegister(app: App<Element>): void {
    app.use(registerElement)
}