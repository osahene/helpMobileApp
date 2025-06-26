import { App } from '@capacitor/app'
import { Capacitor } from '@capacitor/core';



let BackgroundRunner;

const initializeBackgroundRunner = async () => {
  if (Capacitor.isNativePlatform()) {
    const { BackgroundRunner: BR } = await import('@capacitor/background-runner');
    BackgroundRunner = BR;
  } else {
    BackgroundRunner = {
      addListener: () => ({ remove: () => {} }),
      removeAllListeners: () => {},
      dispatchEvent: () => Promise.resolve(),
      isAvailable: () => Promise.resolve({ available: false })
    };
  }
};

initializeBackgroundRunner();


const VOLUME_PRESS_INTERVAL = 500 // Max time between presses (ms)
const PRESS_COUNT_THRESHOLD = 4 // Number of presses to trigger

let pressCount = 0
let lastPressTime = 0
let isRegistered = false

const handleVolumePress = async () => {
  const now = Date.now()

  // Reset if too much time passed since last press
  if (now - lastPressTime > VOLUME_PRESS_INTERVAL) {
    pressCount = 0
  }

  pressCount++
  lastPressTime = now

  // Check if threshold reached
  if (pressCount >= PRESS_COUNT_THRESHOLD) {
    pressCount = 0
    return true
  }

  return false
}

export const registerVolumeButtonListener = async () => {
  if (isRegistered) return

  try {
    if (!BackgroundRunner) {
      await initializeBackgroundRunner();
    }
    
    const isAvailable = await BackgroundRunner.isAvailable()
    if (!isAvailable.available) {
      console.error('Background runner not available:', isAvailable.reason)
      return
    }

    // Then register the listener
    BackgroundRunner.addListener('volumeButtonPressed', async () => {
      if (await handleVolumePress()) {
        if (typeof window.triggerRobberyAlert === 'function') {
          window.triggerRobberyAlert()
        }
      }
    })

    console.log('Volume button listener registered')
    isRegistered = true
  } catch (error) {
    console.error('Background task registration failed:', error)
  }
}
export const unregisterVolumeButtonListener = async () => {
  if (!isRegistered) return

  try {
    await BackgroundRunner.removeAllListeners()
    isRegistered = false
  } catch (error) {
    console.error('Background task unregistration failed:', error)
  }
}

// Register listener when app starts
registerVolumeButtonListener()

// Unregister when app is backgrounded
App.addListener('appStateChange', ({ isActive }) => {
  if (isActive) {
    registerVolumeButtonListener()
  } else {
    unregisterVolumeButtonListener()
  }
})
