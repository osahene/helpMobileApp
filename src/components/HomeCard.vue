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

    <q-card-section class="overflow-hidden q-py-none">
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
<style lang="css">
.card-img {
  width: 10rem;
  height: 10rem;
  top: 2rem;
  right: 1rem;
  position: relative;
}
.head-title {
  font-weight: 600;
  font-size: 4.5rem;
  font-stretch: expanded;
  letter-spacing: 0.2rem;
}
.move {
  position: relative;
  top: -2rem;
}
.my_card_2 {
  width: 26rem;
  border-color: #0b76e0;
  border-width: 3rem;
}
</style>
