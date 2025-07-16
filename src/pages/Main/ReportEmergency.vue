<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md q-px-lg shadow-10 backdrop-blur my_card" rounded>
      <q-card-section class="text-center text-h5">
        <div class="text-grey-9 text-weight-light">Report Emergency Situation</div>
      </q-card-section>

      <q-separator class="q-ma-sm" inset />

      <q-card-section>
        <VoiceRecorder class="q-mb-md" @record-complete="handleAudioRecorded" />
        <VideoRecorder class="q-mb-md" @record-complete="handleVideoRecorded" />
      </q-card-section>

      <q-card-section class="text-center">
        <q-btn
          flat
          class="text-subtitle1 q-px-xl q-py-none q-ma-none shadow-2 text-weight-light"
          icon="fa-regular fa-paper-plane"
          label="Submit"
          @click.prevent="onSubmit"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import VoiceRecorder from 'src/components/VoiceRecorder.vue'
import VideoRecorder from 'src/components/VideoRecorder.vue'
import { Filesystem, Directory } from '@capacitor/filesystem'; // Import Filesystem for native file operations
import { Capacitor } from '@capacitor/core'; // Import Capacitor to check platform

const formData = ref({
  audio: null,
  video: null
})

const handleAudioRecorded = (audioData) => {
  formData.value.audio = audioData
}

const handleVideoRecorded = (videoData) => {
  // videoData will be either a file URI (native) or a blob URL (web)
  formData.value.video = videoData
}

const onSubmit = async () => {
  const payload = new FormData()

  if (formData.value.audio) {
    payload.append('audio', dataURItoBlob(formData.value.audio), 'audio.m4a')
  }

  if (formData.value.video) {
    if (Capacitor.isNativePlatform()) {
      // On native platforms, formData.value.video is a file URI (e.g., file:///...)
      // We need to read the file content to create a Blob for upload
      try {
        const fileContent = await Filesystem.readFile({
          path: formData.value.video,
          directory: Directory.Data, // Or relevant directory where the camera saves
        });
        // fileContent.data is a base64 encoded string
        const blob = b64toBlob(fileContent.data, 'video/mp4'); // Assuming mp4, adjust as needed
        payload.append('video', blob, 'video.mp4');
      } catch (error) {
        console.error('Error reading video file from native:', error);
      }
    } else {
      // On web, formData.value.video is a blob URL (e.g., blob:http://...)
      // We can fetch the blob directly
      try {
        const response = await fetch(formData.value.video);
        const blob = await response.blob();
        payload.append('video', blob, 'video.mp4'); // Assuming mp4, adjust as needed
      } catch (error) {
        console.error('Error fetching video blob from web:', error);
      }
    }
  }

  // Example of how to log payload contents (for debugging)
  for (let [key, value] of payload.entries()) {
    console.log(`${key}:`, value);
  }

  // Now, you can upload to your backend
  // await axios.post('/your-endpoint', payload)
}

// Helper function to convert data URI to Blob (for audio)
const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(',')[1])
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ab], { type: mimeString })
}

// Helper function to convert base64 to Blob (for native video file content)
const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

</script>