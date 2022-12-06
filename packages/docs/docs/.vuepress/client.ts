import { defineClientConfig } from '@vuepress/client'
import 'maz-ui/css/main.css'
import 'maz-ui/css/aos.css'

import { ToasterOptions, installToaster, installWait, installAos, AosOptions } from 'maz-ui'
import * as components from 'maz-ui/components'

export default defineClientConfig({
  enhance: async ({ app, router }) => {
    app.provide('mazIconPath', '/maz-ui-3/icons')

    Object.entries(components).forEach(([componentName, component]) => {
      app.component(componentName, component)
    })

    const toasterOptions: ToasterOptions = {
      persistent: false,
      position: 'bottom-right',
      timeout: 10000,
    }

    const aosOptions: AosOptions = {
      router,
      delay: 500,
      animation: {
        duration: 400,
        once: false
      }
    }

    app.use(installToaster, toasterOptions)
    app.use(installWait)

    // @ts-ignore
    if (!__VUEPRESS_SSR__) {
      app.use(installAos, aosOptions)
    }
  }
})