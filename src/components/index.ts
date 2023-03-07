/*
 *
 *   注册全局组件
 *
 */

import type { App } from 'vue'

const componentsPath = import.meta.glob<any>('../components/**/router/**/*.ts', { eager: true })

const components: Array<any> = []
Object.keys(componentsPath).forEach((key) => {
  if (componentsPath[key].default !== undefined)
    components.push(componentsPath[key].default)
})

export default function (app: App<Element>) {
  for (const item of components)
    app.component(item.name, item)
}
