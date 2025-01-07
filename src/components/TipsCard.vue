<template>
  <div>
    <q-card dark class="bg-grey-9 rounded rounded-md my-card">
      <q-card-section>
        <div class="text-h6">{{ cardTitle }}</div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        <q-scroll-area style="height: 230px; max-width: auto">
          <div class="row no-wrap">
            <div v-for="(item, index) in tips" :key="index" style="width: 250px" class="q-pa-sm">
              <q-card class="my-card">
                <div class="video-container">
                  <iframe
                    :src="getEmbedUrl(item.vidLink)"
                    frameborder="0"
                    allowfullscreen
                    class="responsive-video"
                  ></iframe>
                </div>

                <q-card-section class="bg-dark">
                  <div class="text-subtitle2">{{ item.title }}</div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-scroll-area>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { watchEffect } from 'vue'
const props = defineProps({
  cardTitle: String,
  tips: Array,
})
const getEmbedUrl = (url) => {
  const videoId = url.split('v=')[1]
  return `https://www.youtube.com/embed/${videoId}`
}
watchEffect(() => props)
</script>
