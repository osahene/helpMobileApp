import { registerPlugin } from '@capacitor/core'
import { BackgroundRunner } from '@capacitor/background-runner'

const VolumeButtons = registerPlugin('VolumeButtons')

// Initialize the background task
export default async () => {
  try {
    // Listen to volume buttons
    VolumeButtons.addListener('volumeButtonPressed', ({ direction }) => {
      console.log('Volume button pressed:', direction)
      // Dispatch event to your app
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
}
