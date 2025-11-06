import { Capacitor } from '@capacitor/core'
import { App } from '@capacitor/app'

export const isNativePlatform = () => {
  const isNative = Capacitor.isNativePlatform()
  return {
    App: isNative
      ? App
      : {
          addListener: () => ({ remove: () => {} }),
        },
    isNative,
  }
}
