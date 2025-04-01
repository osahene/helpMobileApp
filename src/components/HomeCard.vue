<template>
  <div
    class="flex flex-col border-gray-900 justify-between backdrop-filter backdrop-blur-sm bg-opacity-10 bg-slate-200 overflow-hidden border-4 border-gray-200 rounded-xl shadow shadow-2xl"
  >
    <div class="py-10 flex flex-col justify-center items-start content-fit">
      <div class="ml-3 flex flex-col items-start">
        <p
          class="head-title font-bold text-black text-[20px] xs:text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px]"
        >
          {{ cardTitle }}
        </p>
        <p
          class="head-title font-bold text-black text-[20px] xs:text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px]"
        >
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
