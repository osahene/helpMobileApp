<template>
    <transition name="fade">
      <div 
        v-if="visible"
        class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[10000]"
      >
        <div class="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center">
          <div class="text-3xl font-bold text-red-600 mb-4">
            ROBBERY ALERT TRIGGERED!
          </div>
          
          <div class="text-xl mb-6">
            Broadcasting to your emergency contacts in:
          </div>
          
          <div class="text-8xl font-bold my-8 text-red-500">
            {{ countdown }}
          </div>
          
          <q-btn 
            color="negative"
            size="lg"
            class="w-full py-3 text-lg"
            @click="cancel"
          >
            CANCEL ALERT
          </q-btn>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    duration: {
      type: Number,
      default: 5
    }
  });
  
  const emit = defineEmits(['cancel', 'complete']);
  
  const visible = ref(false);
  const countdown = ref(props.duration);
  let countdownInterval = null;
  
  const start = () => {
    visible.value = true;
    countdown.value = props.duration;
    
    countdownInterval = setInterval(() => {
      countdown.value--;
      
      if (countdown.value <= 0) {
        clearInterval(countdownInterval);
        emit('complete');
        visible.value = false;
      }
    }, 1000);
  };
  
  const cancel = () => {
    clearInterval(countdownInterval);
    visible.value = false;
    emit('cancel');
  };
  
  defineExpose({ start });
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>