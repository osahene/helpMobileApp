import { registerPlugin } from '@capacitor/core'

// This name 'VolumeListener' MUST match the name property
// in your @CapacitorPlugin(name = "VolumeListener") annotation in VolumeListenerPlugin.java
const VolumeListener = registerPlugin('VolumeListener', {
  // You don't need a web implementation if this is mobile-only
  // web: () => import('./web').then(m => new m.VolumeListenerWeb()),
})

export { VolumeListener }
