<template>
  <q-page class="relative flex-1 flex-grow flex flex-col min-w-0 break-words w-full">
    <div class="m-5 grid grid-cols-2 gap-7 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
      <div v-for="(item, key) in cardInfo" :key="key">
        <HomeCard
          :card-title="item.cardTitle"
          :card-title2="item.cardTitle2"
          :card-img="item.cardImg"
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
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import TriggerCard from 'src/components/TriggerCard.vue'
import { useOperations } from 'src/stores/ops'
import HomeCard from 'src/components/HomeCard.vue'

import healthImg from '../../assets/img/health.svg'
import handcuffsImg from '../../assets/img/handcuffs.svg'
import fireImg from '../../assets/img/fire.svg'
import floodImg from '../../assets/img/flood.svg'
import callImg from '../../assets/img/callss.svg'
import nonviolenceImg from '../../assets/img/nonviolence.svg'
import userssolid from '../../assets/img/userssolid.svg'
import usersolid from '../../assets/img/usersolid.svg'

const TriggerAlert = useOperations()

const dialogOpen = ref(false)
const selectedCard = ref(null)
const notRegisteredImg = usersolid
const noContactsImg = userssolid
const Message = 'All approved contacts on your emergency list would receive this message.'
const noContactsMessage = 'You do not have any contacts in your emergency list. To use this service, register at least one person, and they must approve your request before receiving alerts.'
const noApprovedMessage = 'None of your contacts have approved your request. Alert them to approve your request.'

const contacts = computed(() => TriggerAlert.myContacts || [])
const approveCont = computed(() => 
  contacts.value.filter((contact) => contact.status === 'approve').length
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
  if(approveCont.value === 0) return noContactsImg
  return selectedCard.value?.cardImg || ''
})

const triggerMessage = computed(() => {
  if (contacts.value.length === 0) return noContactsMessage
  if(approveCont.value === 0)return noApprovedMessage
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
  return [{ label: 'Trigger Alert', action: TriggerAction }, { label: 'Cancel', action: onClose }]
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
  },
  {
    id: 2,
    cardTitle: 'Robbery',
    cardTitle2: 'Attack',
    cardImg: handcuffsImg,
  },
  {
    id: 3,
    cardTitle: 'Fire',
    cardTitle2: 'Outbreak',
    cardImg: fireImg,
  },
  {
    id: 4,
    cardTitle: 'Flood',
    cardTitle2: 'Alert',
    cardImg: floodImg,
  },
  {
    id: 5,
    cardTitle: 'Call',
    cardTitle2: 'Emergency',
    cardImg: callImg,
  },
  {
    id: 6,
    cardTitle: 'Violence',
    cardTitle2: 'Alert',
    cardImg: nonviolenceImg,
  },
]

const onClose = () => {
  dialogOpen.value = false
}

const TriggerAction = async () => {
  // Check for the authenticated and contact conditions
  if (contacts.value.length > 0 && approveCont.value > 0) {
    try {
      const geolocation = await getGeolocation()
      await TriggerAlert.alertTrigger( {
        alertType: selectedCard.value?.cardName1,
        location: geolocation,
      })
    } catch (error) {
      console.error('Error triggering alert:', error)
    }
  } else {
    console.warn('Cannot trigger action: User not authenticated or no contacts available.')
  }
}

const getGeolocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Geolocation is not supported by your browser')
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject('User denied the request for Geolocation.')
              break
            case error.POSITION_UNAVAILABLE:
              reject('Location information is unavailable.')
              break
            case error.TIMEOUT:
              reject('The request to get user location timed out.')
              break
            default:
              reject('An unknown error occurred while retrieving location.')
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 },
      )
    }
  })
}
</script>
