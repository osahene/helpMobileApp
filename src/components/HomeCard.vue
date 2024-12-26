<template>
  <!-- <q-card
    v-ripple
    round
    class="q-pb-none q-ma-sm shadow-10 q-px-lg shadow-10 backdrop-blur my_card_2"
  >
    <q-card-section class="q-pa-none">
      <div class="head-title">{{ cardTitle }}</div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <div class="head-title">{{ cardTitle2 }}</div>
    </q-card-section>

    <q-card-section class="q-py-none flex items-start justify-start">
      <img class="card-img" :src="cardImg" />
    </q-card-section>
  </q-card> -->
  <div
    class="flex flex-col justify-between h-full backdrop-filter backdrop-blur-sm bg-opacity-10 bg-slate-200 overflow-hidden border border-gray-200 rounded-xl shadow shadow-xl"
  >
    <div class="p-1 flex flex-col justify-center items-start content-fit">
      <div class="ml-3 flex flex-col items-start">
        <p
          class="font-bold text-[24px] xs:text-[40px] sm:text-[50px] text-gray-700 dark:text-white"
        >
          {{ cardTitle }}
        </p>
        <p class="font-bold text-[24px] xs:text-[40px] sm:text-[50px] text-white dark:text-white">
          {{ cardTitle2 }}
        </p>
      </div>
    </div>
    <div
      class="ml-3 relative flex top-[10px] xs:top-[10px] sm:top-[30px] md:top-[50px] xs:z-[2] justify-start"
    >
      <img class="rounded-t-lg h-[10px] xs:h-[100px] sm:h-[150px]" :src="cardImg" />
    </div>
  </div>
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
