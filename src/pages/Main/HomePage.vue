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
        :card="dialogOpen"
        :card-name1="selectedCard.cardTitle"
        :card-name2="selectedCard.cardTitle2"
        :card-image="selectedCard.cardImg"
        :message="triggerMessage"
        :buttons="triggerButtons"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import TriggerCard from 'src/components/TriggerCard.vue'
import HomeCard from 'src/components/HomeCard.vue'
import healthImg from '../../assets/img/health.svg'
import handcuffsImg from '../../assets/img/handcuffs.svg'
import fireImg from '../../assets/img/fire.svg'
import floodImg from '../../assets/img/flood.svg'
import callImg from '../../assets/img/callss.svg'
import nonviolenceImg from '../../assets/img/nonviolence.svg'
const dialogOpen = ref(false)
const selectedCard = ref(null)
const isAuthenticated = ref(false)
const contacts = ref([])
const notAuthMessage = 'This service is only available to authenticated users.'
const Message = 'All approved contacts on your emergency list would receive this message.'
// const noContacts = 'Zero Contacts'
const noContactsMessage =
  'You do not have any contacts in your emergency list. To use this service, you ought to register at least one person to your emergency list, and they must approve of it before they can receive alerts from you.'
const triggerMessage = computed(() => {
  if (!isAuthenticated.value) return notAuthMessage
  if (contacts.value.length < 1) return noContactsMessage
  return Message
})

const triggerButtons = computed(() => {
  if (!isAuthenticated.value)
    return [
      { label: 'Register', route: '/register' },
      { label: 'Login', route: '/login' },
    ]
  if (contacts.value.length < 1)
    return [{ label: 'Register Contacts', route: '/contacts/register' }, { label: 'Cancel' }]
  return [{ label: 'Trigger Alert' }, { label: 'Cancel' }]
})

const openTrigger = (item) => {
  selectedCard.value = item
  console.log('opens', selectedCard.value)
  dialogOpen.value = true
  console.log('opens_2', dialogOpen.value)
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
</script>
