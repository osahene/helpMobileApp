<template>
  <q-page class="relative flex-1 flex-grow flex flex-col min-w-0 break-words w-full">
    <RobberyCountdown
      ref="robberyCountdownRef"
      @complete="triggerRobberyAlert"
      @cancel="cancelRobberyAlert"
    />
    <div class="m-5 grid grid-cols-2 gap-7 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
      <div v-for="(item, key) in cardInfo" :key="key">
        <HomeCard
          :card-title="item.cardTitle"
          :card-title2="item.cardTitle2"
          :card-img="item.cardImg"
          :card-bg-class="item.cardBgClass"
          :card-text-class="item.cardTextClass"
          @click="openTrigger(item)"
        />
      </div>

      <TriggerCard
        v-if="selectedCard"
        v-model="dialogOpen"
        :card-name1="CardName1"
        :card-name2="CardName2"
        :card-image="CardImage"
        :message="triggerMessage"
        :buttons="triggerButtons"
      />
    </div>

    <!-- Accessibility dialog -->
    <q-dialog v-model="showAccessibilityDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="orange" text-color="white" />
          <span class="q-ml-sm text-h6">Action Required: Enable Emergency Listener</span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          To enable the **Robbery Attack** feature to work even when your app is in the background,
          you must manually enable the "Emergency Alert Volume Button Listener" in your device's
          Accessibility settings.
          <br /><br />
          This allows the app to detect volume button presses (4 times consecutively) to trigger an
          alert, without needing your phone unlocked.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="showAccessibilityDialog = false" />
          <q-btn
            flat
            label="Go to Settings"
            color="primary"
            @click="requestAccessibilityPermission"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Accessibility dialog Ends -->
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import TriggerCard from 'src/components/TriggerCard.vue'
import RobberyCountdown from 'src/components/RobberyCountdown.vue'
import { useOperations } from 'src/stores/ops'
import { Geolocation as CapGeolocation } from '@capacitor/geolocation'
import { isNativePlatform } from '../../utils/platform'
import HomeCard from 'src/components/HomeCard.vue'
import healthImg from '../../assets/img/health.svg'
import handcuffsImg from '../../assets/img/handcuffs.svg'
import fireImg from '../../assets/img/fire.svg'
import floodImg from '../../assets/img/flood.svg'
import callImg from '../../assets/img/callss.svg'
import nonviolenceImg from '../../assets/img/nonviolence.svg'
import userssolid from '../../assets/img/userssolid.svg'
import usersolid from '../../assets/img/usersolid.svg'
import { useQuasar } from 'quasar'
import { VolumeListener } from 'src/utils/volume-listener-plugin' // Adjust this path if your file is elsewhere

const TriggerAlert = useOperations()
const $q = useQuasar()
const dialogOpen = ref(false)
const selectedCard = ref(null)
const notRegisteredImg = usersolid
const noContactsImg = userssolid
const Message = 'All approved contacts on your emergency list would receive this message.'
const noContactsMessage =
  'You do not have any contacts in your emergency list. To use this service, register at least one person, and they must approve your request before receiving alerts.'
const noApprovedMessage =
  'None of your contacts have approved your request. Alert them to approve your request.'
const robberyCountdownRef = ref(null)
const showAccessibilityDialog = ref(false)
const isAccessibilityServiceEnabled = ref(false)

const robberyCard = {
  id: 2,
  cardTitle: 'Robbery',
  cardTitle2: 'Attack',
  cardBgClass: 'bg-[#FF3B30]',
  cardImg: handcuffsImg,
}

// Mount/Unmount listeners

onMounted(() => {
  checkAccessibilityStatus()

  if (VolumeListener) {
    VolumeListener.addListener('onAlertSequence', (info) => {
      console.log('Native alert sequence event:', info.status)
      if (info.status === 'countdown_started') {
        // Trigger UI for 5-second countdown in the child component
        if (robberyCountdownRef.value) {
          robberyCountdownRef.value.start()
        }
        $q.notify({
          type: 'negative',
          message: 'EMERGENCY ALERT IMMINENT! You have 5 seconds to cancel.',
          timeout: 5000,
          position: 'top',
          group: false, // Important to show unique notification
        })
      } else if (info.status === 'triggered') {
        console.log('ALERT TRIGGERED by native!')
        triggerRobberyAlert() // Call your existing alert sending logic
      } else if (info.status === 'cancelled') {
        console.log('Alert sequence cancelled by native.')
        if (robberyCountdownRef.value) {
          robberyCountdownRef.value.cancel() // Stop child component countdown
        }
        $q.notify({
          type: 'info',
          message: 'Emergency Alert Cancelled.',
          timeout: 2000,
          position: 'bottom',
        })
      }
    })
  }
})

onBeforeUnmount(() => {
  if (VolumeListener) {
    VolumeListener.removeAllListeners('onAlertSequence')
  }
})

const contacts = computed(() => TriggerAlert.myContacts || [])
const approveCont = computed(
  () => contacts.value.filter((contact) => contact.status === 'approved').length,
)

const CardName1 = computed(() => {
  if (contacts.value.length === 0) return 'No'
  if (approveCont.value === 0) return 'No'
  return selectedCard.value?.cardTitle || ''
})

const CardName2 = computed(() => {
  if (contacts.value.length === 0) return ' Contacts'
  if (approveCont.value === 0) return ' Approved Contacts'
  return selectedCard.value?.cardTitle2 || ''
})

const CardImage = computed(() => {
  if (contacts.value.length === 0) return notRegisteredImg
  if (approveCont.value === 0) return noContactsImg
  return selectedCard.value?.cardImg || ''
})

const triggerMessage = computed(() => {
  if (contacts.value.length === 0) return noContactsMessage
  if (approveCont.value === 0) return noApprovedMessage
  return Message
})

const triggerButtons = computed(() => {
  if (contacts.value.length === 0)
    return [
      { label: 'Register Contacts', route: '/pages/edit' },
      { label: 'Cancel', action: onClose },
    ]
  if (approveCont.value === 0)
    return [
      { label: 'Contact List', route: '/pages/list' },
      { label: 'Cancel', action: onClose },
    ]
  return [
    { label: 'Trigger Alert', action: TriggerAction },
    { label: 'Cancel', action: onClose },
  ]
})

const openTrigger = (item) => {
  selectedCard.value = item
  dialogOpen.value = true
}

const cardInfo = [
  {
    id: 1,
    cardTitle: 'Health',
    cardTitle2: 'Crisis',
    cardImg: healthImg,
    cardBgClass: 'bg-card1', // Deep Royal Blue
    cardTextClass: 'text-white',
  },
  {
    id: 2,
    cardTitle: 'Robbery',
    cardTitle2: 'Attack',
    cardImg: handcuffsImg,
    cardBgClass: 'bg-card4', // Bright Red
    cardTextClass: 'text-white',
  },
  {
    id: 3,
    cardTitle: 'Fire',
    cardTitle2: 'Outbreak',
    cardImg: fireImg,
    cardBgClass: 'bg-card2',
    cardTextClass: 'text-black',
  },
  {
    id: 4,
    cardTitle: 'Flood',
    cardTitle2: 'Alert',
    cardImg: floodImg,
    cardBgClass: 'bg-card4', // Deep Royal Blue
    cardTextClass: 'text-white',
  },
  {
    id: 5,
    cardTitle: 'Call',
    cardTitle2: 'Emergency',
    cardImg: callImg,
    cardBgClass: 'bg-card2', // Warm Yellow (CTA Highlight)
    cardTextClass: 'text-black',
  },
  {
    id: 6,
    cardTitle: 'Violence',
    cardTitle2: 'Alert',
    cardImg: nonviolenceImg,
    cardBgClass: 'bg-card4', // Deep Royal Blue
    cardTextClass: 'text-white',
  },
]

const onClose = () => {
  dialogOpen.value = false
}

const triggerRobberyAlert = async () => {
  selectedCard.value = robberyCard
  if (contacts.value.length > 0 && approveCont.value > 0) {
    const geolocation = await getGeolocation()
    if (!geolocation.latitude || !geolocation.longitude) {
      $q.notify({
        message: 'Location not available. Please turn on your device location',
        type: 'negative',
        icon: 'location_off',
        position: 'bottom',
        timeout: 3000,
      })
      return
    }
    try {
      await TriggerAlert.alertTrigger({
        alertType: robberyCard.cardTitle,
        location: geolocation,
      })

      $q.notify({
        message: 'Robbery alert sent to your emergency contacts!',
        type: 'positive',
        icon: 'check_circle',
        position: 'bottom',
        timeout: 3000,
      })
    } catch (error) {
      $q.notify({
        message: 'Failed to send robbery alert: ' + error.message,
        type: 'negative',
        icon: 'error',
        position: 'bottom',
        timeout: 3000,
      })
    }
  } else {
    $q.notify({
      message: 'Cannot send alert: No approved contacts available',
      type: 'negative',
      icon: 'error',
      position: 'bottom',
      timeout: 3000,
    })
  }
}

const cancelRobberyAlert = () => {
  $q.notify({
    message: 'Robbery alert canceled',
    type: 'info',
    icon: 'cancel',
    position: 'bottom',
    timeout: 2000,
  })
}

const checkAccessibilityStatus = async () => {
  if (VolumeListener) {
    // Ensure plugin is available

    try {
      const { enabled } = await VolumeListener.isAccessibilityServiceEnabled()

      isAccessibilityServiceEnabled.value = enabled

      if (!enabled) {
        showAccessibilityDialog.value = true // Show dialog if not enabled
      }
    } catch (e) {
      console.error('Error checking accessibility status:', e)

      $q.notify({
        type: 'negative',
        message: e || 'Could not check accessibility service status. Component',
      })
    }
  }
}

const requestAccessibilityPermission = async () => {
  if (VolumeListener) {
    try {
      await VolumeListener.requestAccessibilityServicePermission()

      showAccessibilityDialog.value = false // Close dialog as user is taken to settings

      $q.notify({
        type: 'info',

        message: 'Please enable "Emergency Alert Volume Button Listener" in settings.',

        timeout: 5000,

        position: 'center',
      })
    } catch (e) {
      console.error('Failed to open accessibility settings:', e)

      $q.notify({ type: 'negative', message: 'Failed to open accessibility settings.' })
    }
  }
}

const TriggerAction = async () => {
  // Check for the authenticated and contact conditions

  if (contacts.value.length > 0 && approveCont.value > 0) {
    const geolocation = await getGeolocation()

    if (!geolocation.latitude || !geolocation.longitude) {
      console.error('Geolocation not available')

      $q.notify({
        message: 'Location not available. Please turn on your device location',

        type: 'negative',

        icon: 'location_off',

        position: 'bottom',

        timeout: 3000,
      })

      return
    } else {
      await TriggerAlert.alertTrigger({
        alertType: selectedCard.value?.cardTitle,

        location: geolocation,
      })

      onClose()
    }
  } else {
    $q.notify({
      message: 'Error triggering alert: No approved contacts or user not authenticated',
      type: 'negative',
      icon: 'error',
      position: 'bottom',

      timeout: 3000,
    })
  }
}

const getGeolocation = async () => {
  if (isNativePlatform()) {
    return getNativeGeolocation()
  } else {
    return getWebGeolocation()
  }
}

const getNativeGeolocation = async () => {
  try {
    const coordinates = await CapGeolocation.getCurrentPosition(
      {
        enableHighAccuracy: true,

        timeout: 60000,
      },
      $q.notify({
        message: 'Mobile location triggered',
        type: 'negative',
        icon: 'location_off',
        position: 'bottom',
        timeout: 3000,
      }),
    )

    return {
      latitude: coordinates.coords.latitude,

      longitude: coordinates.coords.longitude,

      accuracy: coordinates.coords.accuracy,
    }
  } catch (error) {
    $q.notify({
      message: error.message || 'User denied the request for Geolocation.',
      type: 'negative',
      icon: 'location_off',
      position: 'bottom',
      timeout: 3000,
    })
  }
}

const getWebGeolocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Geolocation is not supported by your browser')
    } else {
      navigator.geolocation.getCurrentPosition(
        () => {
          const watchId = navigator.geolocation.watchPosition(
            (position) => {
              resolve({
                latitude: position.coords.latitude,

                longitude: position.coords.longitude,

                accuracy: position.coords.accuracy,
              })
              // Clear the watch immediately after getting position
              navigator.geolocation.clearWatch(watchId)
            },
            (error) => handleGeolocationError(error, reject),
            { enableHighAccuracy: true, timeout: 60000, maximumAge: 0 },
          )
        },

        (error) => handleGeolocationError(error, reject),

        { enableHighAccuracy: true, timeout: 60000 },
      )
    }
  })
}

const handleGeolocationError = (error, reject) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      $q.notify({
        message: 'User denied the request for Geolocation.',
        type: 'negative',
        icon: 'location_off',
        position: 'bottom',
        timeout: 3000,
      })
      break
    case error.POSITION_UNAVAILABLE:
      $q.notify({
        message: 'Location information is unavailable.',
        type: 'negative',
        icon: 'location_off',
        position: 'bottom',
        timeout: 3000,
      })
      break
    case error.TIMEOUT:
      $q.notify({
        message: 'The request to get user location timed out.',
        type: 'negative',
        icon: 'location_off',
        position: 'bottom',
        timeout: 3000,
      })
      break
    case error.UNKNOWN_ERROR:
      $q.notify({
        message: 'An unknown error occurred.',
        type: 'negative',
        icon: 'location_off',
        position: 'bottom',
        timeout: 3000,
      })
      break
  }
  reject(error)
}
</script>
