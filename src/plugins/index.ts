/*
*
*   注册插件
*
*/
import type { App } from 'vue'

const pluginPath = import.meta.globEager('../plugins/*/*.ts');
const plugins:Array<any> = [];
Object.keys(pluginPath).forEach(key => {
  if (pluginPath[key].default !== undefined) {
    plugins.push(pluginPath[key].default);
  }
})

export default function (app: App) {
  for (let item of plugins) {
    app.use(item);
  }
}
