// Use your custom plugin
import { VolumeListener } from 'src/utils/volume-listener-plugin'
import { App } from '@capacitor/app' // For listening to app state changes

export default async ({ app }) => {
  app.config.globalProperties.$volumeListener = VolumeListener

  VolumeListener.addListener('onAlertSequence', (info) => {
    console.log('Native alert sequence event:', info.status)
    if (info.status === 'countdown_started') {
      console.log('Alert countdown started!')
      app.config.globalProperties.$q.notify({
        type: 'negative',
        message: 'EMERGENCY ALERT IMMINENT! Tap to cancel!',
        actions: [
          {
            label: 'CANCEL',
            color: 'white',
            handler: () => {
              VolumeListener.cancelAlert() // This calls YOUR plugin's cancel method
            },
          },
        ],
        timeout: 5000,
        position: 'center',
        group: false,
      })
    } else if (info.status === 'triggered') {
      console.log('ALERT TRIGGERED! Sending API request...')
      app.config.globalProperties.$q.notify({
        type: 'positive',
        message: 'EMERGENCY ALERT SENT to loved ones!',
        timeout: 3000,
        position: 'top',
      })
    } else if (info.status === 'cancelled') {
      console.log('Alert sequence cancelled by native.')
      app.config.globalProperties.$q.notify({
        type: 'info',
        message: 'Emergency Alert Cancelled.',
        timeout: 2000,
        position: 'bottom',
      })
    }
  })

  // --- Initial check for Accessibility Service status ---
  try {
    const { enabled } = await VolumeListener.isAccessibilityServiceEnabled()
    if (!enabled) {
      console.warn('Accessibility Service is not enabled. Prompt user to enable it.')
      app.config.globalProperties.$q.notify({
        type: 'warning',
        message:
          'Emergency Listener not active. Enable Accessibility Service for full functionality.',
        timeout: 0,
        actions: [
          {
            label: 'DISMISS',
            color: 'white',
            handler: () => {
              /* ... */
            },
          },
          {
            label: 'SETTINGS',
            color: 'yellow',
            handler: () => {
              VolumeListener.requestAccessibilityServicePermission()
            },
          },
        ],
      })
    }
  } catch (e) {
    console.error('Error checking accessibility status:', e)
    app.config.globalProperties.$q.notify({
      type: 'negative',
      message: 'Could not check accessibility service status.',
    })
  }

  // --- Listen for app state changes to re-check status on resume ---
  App.addListener('appStateChange', ({ isActive }) => {
    if (isActive) {
      VolumeListener.isAccessibilityServiceEnabled()
        .then(({ enabled }) => {
          if (!enabled) {
            console.warn('Accessibility Service is not enabled after app resume.')
            app.config.globalProperties.$q.notify({
              type: 'warning',
              message:
                'Emergency Listener not active. Enable Accessibility Service for full functionality.',
              timeout: 0,
              actions: [
                {
                  label: 'DISMISS',
                  color: 'white',
                  handler: () => {
                    /* ... */
                  },
                },
                {
                  label: 'SETTINGS',
                  color: 'yellow',
                  handler: () => {
                    VolumeListener.requestAccessibilityServicePermission()
                  },
                },
              ],
            })
          }
        })
        .catch((e) => console.error('Error re-checking accessibility on resume:', e))
    }
  })
}
