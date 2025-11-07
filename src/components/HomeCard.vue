<template>
  <div
    class="flex flex-col w-full h-full  justify-between overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-150 ease-out border-2 border-gray-200 rounded-xl shadow shadow-2xl"
    :class="cardBgClass"
  >
    <div class="flex flex-col py-8 justify-around items-start px-3">
      <div class="">
        <img class="card-img rounded-t-lg" :src="cardImg" />
      </div>
      <div class="py-3 flex flex-col justify-center content-fit">
        <div class="ml-3 flex flex-col items-start">
          <p
            class="head-title font-bold text-[20px] xs:text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px]"
            :class="cardTextClass"
            >
            {{ cardTitle }}
          </p>
          <p
          class="head-title font-bold text-[20px] xs:text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px]"
          :class="cardTextClass"
          >
            {{ cardTitle2 }}
          </p>
        </div>
      </div>
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
  // New props for dynamic styling
  cardBgClass: {
    type: String,
    default: 'bg-card1', // Deep Royal Blue default
  },
  cardTextClass: {
    type: String,
    default: 'text-white',
  },
})

watchEffect(() => props) // This line is not necessary for function but can remain

// You might not need watchEffect if you're just defining props
</script>
