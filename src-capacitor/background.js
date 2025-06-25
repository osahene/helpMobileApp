import { registerPlugin } from '@capacitor/core'
import { BackgroundRunner } from '@capacitor/background-runner'

const VolumeButtons = registerPlugin('VolumeButtons')

// Register the background task
BackgroundRunner.addListener('volumeButtonPressed', async () => {
  try {
    // Listen to actual hardware volume buttons
    VolumeButtons.addListener('volumeButtonPressed', ({ direction }) => {
      // Forward the event to your handler
      BackgroundRunner.dispatchEvent({
        label: 'com.example.background.task',
        event: 'volumeButtonPressed',
        details: { direction },
      })
    })

    return { success: true }
  } catch (error) {
    return { error: error.message }
  }
})

// Initialize the background task
BackgroundRunner.init()
