<template>
  <q-card
    v-ripple
    round
    class="q-pb-none q-ma-sm shadow-10 q-px-lg shadow-10 backdrop-blur my_card_2"
  >
    <q-card-section class="q-pa-none">
      <div class="head-title">{{ cardTitle }}</div>
    </q-card-section>
    <q-card-section class="q-pa-none move">
      <div class="head-title">{{ cardTitle2 }}</div>
    </q-card-section>

    <q-card-section class="q-py-none">
      <img class="card-img" :src="cardImg" />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { watchEffect } from 'vue'
const props = defineProps({
  cardTitle: {
    type: String,
  },
  cardTitle2: {
    type: String,
  },
  cardImg: {
    type: String,
  },
})
watchEffect(() => props)
</script>
