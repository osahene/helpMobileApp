<template>
  <div
    class="flex flex-col justify-between h-full backdrop-filter backdrop-blur-sm bg-opacity-10 bg-slate-200 overflow-hidden border border-gray-200 rounded-xl shadow shadow-xl"
  >
    <div class="p-1 flex flex-col justify-center items-start content-fit">
      <div class="ml-3 flex flex-col items-start">
        <p class="head-title text-gray-700 dark:text-white">
          {{ cardTitle }}
        </p>
        <p class="head-title text-white dark:text-white">
          {{ cardTitle2 }}
        </p>
      </div>
    </div>
    <div
      class="ml-3 relative flex xs:top-[10px] sm:top-[30px] md:top-[50px] xs:z-[2] justify-start"
    >
      <img class="card-img rounded-t-lg h-[10px] xs:h-[100px] sm:h-[150px]" :src="cardImg" />
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
