<template>
  <q-page class="flex flex-center column q-pa-md">
    <!-- Onboarding Content -->
    <div
      v-for="(item, index) in onBoardSteps"
      :key="item.id"
      v-show="currentStep === index"
      class="onboard-content fade"
    >
      <q-icon :name="item.logo" class="logo" />
      <div class="text-content">
        <h4 class="title q-ma-none">{{ item.title }}</h4>
        <h4 v-if="item.title2" class="title q-ma-none">{{ item.title2 }}</h4>
      </div>
      <h5 class="messages text-weight-light">{{ item.message }}</h5>
    </div>

    <!-- Footer with indicators and navigation -->
    <q-footer
      class="q-px-lg transparent q-py-sm flex justify-between items-center w-full bottom-0 footer-animate"
    >
      <div>
        <q-btn push color="primary" @click.prevent="SkipOnboard" size="md" label="Skip" />
      </div>
      <div>
        <div class="indicators row justify-center">
          <div
            v-for="(item, idx) in onBoardSteps"
            :key="item.id"
            :class="['indicator', { active: idx === currentStep }]"
          ></div>
        </div>
      </div>
      <div>
        <q-btn
          :label="currentStep === onBoardSteps.length - 1 ? 'Get Started' : ''"
          @click.prevent="nextStep"
          rounded
          class="flex items-center text-weight-light"
          color="primary"
          size="md"
        >
          <q-icon
            v-if="currentStep < onBoardSteps.length - 1"
            name="fas fa-arrow-right fa-fade"
            class="q-ml-sm"
          />
        </q-btn>
      </div>
    </q-footer>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fabAdversal, fasBookBible, fasTruckFast } from '@quasar/extras/fontawesome-v6'
import { useRouter } from 'vue-router'
import { useSwipe } from '@vueuse/core'

const router = useRouter()
const onBoardSteps = [
  {
    id: 1,
    title: 'Welcome to',
    title2: 'Help OO Help',
    logo: fabAdversal,
    message:
      'Use our system to swiftly get in touch with loved ones in serious moments of crisis with just 2 taps.',
  },
  {
    id: 2,
    title: 'Swift Info Sharing',
    logo: fasTruckFast,
    message: 'Share the most essential situation with your loved ones without doing much.',
  },
  {
    id: 3,
    title: 'Safety Tips',
    logo: fasBookBible,
    message: 'Share the most essential situation with your loved ones without doing much.',
  },
]

const currentStep = ref(0)

const completeOnboaard = () => {
    const countView = parseInt(localStorage.getItem('onBoardCount') || '0', 10)

  if (countView < 2) {
    localStorage.setItem('onBoardCount', countView + 1)
    router.push({path : '/auth/login'})
  } else {
    router.push({path : '/auth/login'})
    }
}
// Navigation logic
const nextStep = () => {
  if (currentStep.value < onBoardSteps.length - 1) {
    currentStep.value++
  } else {
    // router.push({ path: '/auth/login' })
    completeOnboaard()
  }
}

const SkipOnboard = () => {
  completeOnboaard()
  // router.push({ path: '/auth/login' })
}
// Swipe functionality
const swipeArea = ref(null)
useSwipe(swipeArea, {
  onSwipeLeft: () => {
    if (currentStep.value < onBoardSteps.length - 1) currentStep.value++
  },
  onSwipeRight: () => {
    if (currentStep.value > 0) currentStep.value--
  },
})

// Trigger animation when the component mounts
onMounted(() => {
  const footer = document.querySelector('.footer-animate')
  footer.classList.add('punch-in')
})
</script>
