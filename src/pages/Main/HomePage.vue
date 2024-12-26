<template>
  <q-page class="flex flex-grow col-12 col-sm-6 col-md-4 q-gutter-lg flex-center">
    <div v-for="(item, key) in cardInfo" :key="key" class="flex h-50 w-50 justify-center">
      <HomeCard
        :card-title="item.cardTitle"
        :card-title2="item.cardTitle2"
        :card-img="item.cardImg"
      />
    </div>
  </q-page>
</template>

<script setup>
import HomeCard from 'src/components/HomeCard.vue'
import healthImg from '../../assets/img/health.svg'
import handcuffsImg from '../../assets/img/handcuffs.svg'
import fireImg from '../../assets/img/fire.svg'
import floodImg from '../../assets/img/flood.svg'
import callImg from '../../assets/img/callss.svg'
import nonviolenceImg from '../../assets/img/nonviolence.svg'
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
