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
        <h1 class="title q-ma-none">{{ item.title }}</h1>
        <h1 v-if="item.title2" class="title2 q-ma-none">{{ item.title2 }}</h1>
      </div>
      <h3 class="messages">{{ item.message }}</h3>
    </div>

    <!-- Footer with indicators and navigation -->
    <q-footer
      class="q-px-lg transparent q-py-sm flex justify-between items-center w-full bottom-0 footer-animate"
    >
      <div>
        <q-btn push color="primary" size="lg" label="Skip" />
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
          @click="nextStep"
          rounded
          class="flex items-center"
          color="primary"
          size="lg"
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
import router from 'src/router'
import { useSwipe } from '@vueuse/core'

// Onboarding steps data
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

// Navigation logic
const nextStep = () => {
  if (currentStep.value < onBoardSteps.length - 1) {
    currentStep.value++
  } else {
    router.push('/')
  }
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

<style scoped>
.onboard-content {
  animation: fadeIn 2s ease-in-out;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 900px;
  opacity: 0;
  transition: opacity 0.5s;
}
.onboard-content.fade {
  opacity: 1;
}

.logo {
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
}

.messages {
  text-align: center;
}

.indicators {
  margin-top: 20px;
}

.indicator {
  width: 12px;
  height: 12px;
  margin: 0 4px;
  border-radius: 50%;
  background-color: #ddd;
  transition: background-color 0.3s;
}

.indicator.active {
  background-color: #03a9f4;
}

.footer-animate {
  opacity: 0;
  animation: punchIn 0.5s ease-in-out forwards;
}

@keyframes punchIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
