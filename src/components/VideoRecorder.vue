<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <div class="text-h6">Video Recorder</div>

      <div v-if="!videoBlob" class="text-center q-my-md">
        <q-btn
          color="primary"
          icon="videocam"
          label="Record Video"
          @click="startRecording"
        />
      </div>

      <div v-if="videoBlob" class="q-mt-md">
        <video
          ref="videoPlayer"
          :src="videoUrl"
          controls
          class="full-width"
          style="max-height: 300px; border-radius: 8px;"
        ></video>

        <div class="row justify-center q-mt-sm">
          <q-btn round flat icon="play_arrow" @click="playVideo" />
          <q-btn round flat icon="pause" @click="pauseVideo" />
          <q-btn round flat icon="fast_forward" @click="toggleVideoSpeed" />
          <q-btn round flat icon="delete" color="negative" @click="deleteVideo" />
        </div>
        <div class="text-center">
          Playback speed: {{ videoSpeed }}x
        </div>
      </div>

      </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue' // Import watch for reactivity
import { useQuasar } from 'quasar'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera' // Import necessary Camera enums

const $q = useQuasar()
const videoBlob = ref(null) // This will store the actual file path for native or the blob URL for web
const videoUrl = ref('') // This will be the URL to display in the <video> tag
const videoPlayer = ref(null)
const videoSpeed = ref(1)
let videoTimer = null
const maxVideoDuration = 60 // 1 minute in seconds

onMounted(async () => {
  console.log('VideoRecorder component mounted. Requesting camera permissions...');
  try {
    console.log('Requesting camera permissions...');
    const permStatus = await Camera.requestPermissions();
    console.log('Camera permissions status:', permStatus);
    if (permStatus.camera === 'denied' || permStatus.microphone === 'denied') {
      $q.notify({
        type: 'warning',
        message: 'Camera and microphone permissions are required to record videos. Please enable them in app settings.',
        timeout: 5000,
        // actions: [
        //   { label: 'Settings', handler: () => {
        //       // Open app settings - requires @capacitor/app plugin
        //       // import { App } from '@capacitor/app';
        //       // App.openSettings();
        //     }, color: 'white' }
        // ]
      });
    }
  } catch (e) {
    console.error('Error requesting permissions:', e);
    $q.notify({ type: 'negative', message: 'Failed to request camera permissions.' });
  }
});

// Emit an event to the parent component with the video data
const emit = defineEmits(['record-complete'])

const startRecording = async () => {
  console.log('Attempting to record video...');
  try {
    const video = await Camera.getVideo({
      quality: 100, // Quality can be 0-100
      duration: maxVideoDuration, // This is the duration limit in seconds
      // Capacitor 4+ uses presentationStyle for prompt customization
      // For older versions, the promptLabel options might still work on some platforms
      presentationStyle: 'fullscreen', // 'fullscreen', 'popover', or 'formSheet'
      source: CameraSource.Prompt, // Allows user to choose between camera or gallery
      resultType: CameraResultType.Uri, // This is key: get a URI
    });

    console.log('Video recording result:', video);

    if (video && video.path) {
      // For native platforms, video.path will be the file URI
      videoBlob.value = video.path;
      videoUrl.value = video.path; // Use path for display on native
      $q.notify({ type: 'positive', message: 'Video recorded successfully!' });

      // Emit the path to the parent for potential upload
      emit('record-complete', video.path);

    } else if (video && video.webPath) {
      // For web (PWA/browser), video.webPath will be a blob URL
      videoBlob.value = video.webPath; // Store the webPath
      videoUrl.value = video.webPath; // Use webPath for display on web
      $q.notify({ type: 'positive', message: 'Video recorded successfully!' });

      // On web, webPath is a blob URL. If you need to upload it,
      // you'll need to fetch the blob content.
      // This part will be handled in the parent component if necessary.
      emit('record-complete', video.webPath);
    } else {
        throw new Error('Video path or webPath not found.');
    }

    // Reset recording state (these might not be needed for Capacitor Camera)
    clearInterval(videoTimer);

  } catch (error) {
    console.error('Video recording failed:', error);
    // Check for user cancellation specifically
    if (error.message === 'User cancelled photos app' || error.message === 'User cancelled video recording.') {
      $q.notify({ type: 'info', message: 'Video recording cancelled.' });
    } else {
      $q.notify({ type: 'negative', message: 'Video recording failed. Please ensure camera permissions are granted.' });
    }
  }
}

const playVideo = () => {
  if (videoPlayer.value) {
    videoPlayer.value.playbackRate = videoSpeed.value
    videoPlayer.value.play()
  }
}

const pauseVideo = () => {
  if (videoPlayer.value) {
    videoPlayer.value.pause()
  }
}

const toggleVideoSpeed = () => {
  videoSpeed.value = videoSpeed.value === 1 ? 1.5 : videoSpeed.value === 1.5 ? 2 : 1
  if (videoPlayer.value) {
    videoPlayer.value.playbackRate = videoSpeed.value
  }
}

const deleteVideo = () => {
  videoBlob.value = null
  videoUrl.value = ''
  // Emit null to the parent to indicate video deletion
  emit('record-complete', null);
}

// const formatTime = (seconds) => {
//   const mins = Math.floor(seconds / 60)
//   const secs = seconds % 60
//   return `${mins}:${secs < 10 ? '0' : ''}${secs}`
// }

// Watch for changes in videoUrl and update videoPlayer's src if needed
// This might be redundant if the video element is re-rendered, but good for robustness
watch(videoUrl, (newUrl) => {
  if (videoPlayer.value && newUrl) {
    videoPlayer.value.src = newUrl;
  }
});
</script>