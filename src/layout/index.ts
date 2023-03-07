import type { App } from 'vue'

import contentLayout from './content/index.vue'
import noneLayout from './none/index.vue'

export default function layoutRegister(app: App<Element>) {
  app.component(contentLayout.name, contentLayout)
  app.component(noneLayout.name, noneLayout)
}
