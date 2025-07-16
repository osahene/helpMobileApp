<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <div class="text-h6">Video Recorder</div>

      <div v-if="!videoUrl" class="text-center q-my-md">
        <q-btn
          color="primary"
          icon="videocam"
          label="Record Video"
          @click="startRecording"
          :disable="!cameraInitialized"
        />
        <p v-if="!cameraInitialized" class="text-caption text-red q-mt-sm">
          Initializing camera...
        </p>
      </div>

      <div v-if="videoUrl" class="q-mt-md">
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
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useQuasar } from 'quasar';
import { VideoRecorder, VideoRecorderCamera, VideoRecorderQuality } from '@capacitor-community/video-recorder';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

const $q = useQuasar();
const emit = defineEmits(['record-complete']);

const videoUrl = ref(null);
const videoPlayer = ref(null);
const videoSpeed = ref(1);
const cameraInitialized = ref(false);
const recordedVideoPath = ref(null);
const isRecording = ref(false);

// Check and request camera permissions
const checkPermissions = async () => {
  try {
    const cameraStatus = await Permissions.checkPermission({ name: 'camera' });
    const microphoneStatus = await Permissions.checkPermission({ name: 'microphone' });
    
    if (cameraStatus.state !== 'granted') {
      await Permissions.requestPermission({ name: 'camera' });
    }
    
    if (microphoneStatus.state !== 'granted') {
      await Permissions.requestPermission({ name: 'microphone' });
    }
    
    return true;
  } catch (error) {
    console.error('Permission error:', error);
    $q.notify({
      type: 'negative',
      message: 'Camera permission required',
      caption: 'Please enable camera permissions in app settings'
    });
    return false;
  }
};

// Initialize the video recorder with retry logic
const initializeRecorder = async () => {
  try {
    const hasPermission = await checkPermissions();
    if (!hasPermission) {
      cameraInitialized.value = false;
      return;
    }
    
    // First remove any existing listeners
    VideoRecorder.removeAllListeners();
    
    // Initialize with retry logic
    let retries = 3;
    while (retries > 0) {
      try {
        await VideoRecorder.initialize({
          camera: VideoRecorderCamera.FRONT,
          quality: VideoRecorderQuality.MAX_720P,
          autoShow: true,
        });
        cameraInitialized.value = true;
        return;
      } catch (initError) {
        retries--;
        if (retries === 0) throw initError;
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  } catch (error) {
    console.error('Error initializing video recorder:', error);
    cameraInitialized.value = false;
    $q.notify({
      type: 'negative',
      message: 'Failed to initialize camera',
      caption: error.message
    });
  }
};

// Start recording with camera preview
const startRecording = async () => {
  if (isRecording.value) return;
  
  try {
    if (!cameraInitialized.value) {
      await initializeRecorder();
    }
    
    await VideoRecorder.showPreview();
    await new Promise(resolve => setTimeout(resolve, 300)); // Small delay for preview to show
    
    await VideoRecorder.startRecording();
    isRecording.value = true;
    
    $q.notify({
      type: 'info',
      message: 'Recording started',
      timeout: 1000
    });
  } catch (error) {
    console.error('Error starting recording:', error);
    $q.notify({
      type: 'negative',
      message: 'Failed to start recording',
      caption: error.message
    });
  }
};

// Stop recording and get the video
const stopRecording = async () => {
  if (!isRecording.value) return;
  
  try {
    const result = await VideoRecorder.stopRecording();
    isRecording.value = false;
    console.log('Recording stopped:', result);
    
    if (result?.video) {
      recordedVideoPath.value = result.video;
      
      if (!Capacitor.isNativePlatform()) {
        videoUrl.value = result.video;
      } else {
        try {
          const file = await Filesystem.readFile({
            path: result.video,
            directory: Directory.Data,
          });
          
          const blob = b64toBlob(file.data, 'video/mp4');
          videoUrl.value = URL.createObjectURL(blob);
        } catch (readError) {
          console.error('Error reading video file:', readError);
          $q.notify({
            type: 'negative',
            message: 'Failed to load recorded video',
            caption: readError.message
          });
        }
      }
      
      emit('record-complete', result.video);
      $q.notify({
        type: 'positive',
        message: 'Video recorded successfully',
        timeout: 2000
      });
    }
  } catch (error) {
    console.error('Error stopping recording:', error);
    $q.notify({
      type: 'negative',
      message: 'Failed to stop recording',
      caption: error.message
    });
  }
};

// Helper function to convert base64 to Blob
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

  return new Blob(byteArrays, { type: contentType });
};

// Video player controls
const playVideo = () => {
  if (videoPlayer.value) {
    videoPlayer.value.play();
  }
};

const pauseVideo = () => {
  if (videoPlayer.value) {
    videoPlayer.value.pause();
  }
};

const toggleVideoSpeed = () => {
  videoSpeed.value = videoSpeed.value === 1 ? 2 : 1;
  if (videoPlayer.value) {
    videoPlayer.value.playbackRate = videoSpeed.value;
  }
};

const deleteVideo = async () => {
  try {
    // Clean up native file if it exists
    if (Capacitor.isNativePlatform() && recordedVideoPath.value) {
      await Filesystem.deleteFile({
        path: recordedVideoPath.value,
        directory: Directory.Data,
      });
    }
    
    // Clean up blob URL if it exists
    if (videoUrl.value && !Capacitor.isNativePlatform()) {
      URL.revokeObjectURL(videoUrl.value);
    }
    
    videoUrl.value = null;
    recordedVideoPath.value = null;
    emit('record-complete', null);
  } catch (error) {
    console.error('Error deleting video:', error);
    $q.notify({
      type: 'negative',
      message: 'Failed to delete video',
      caption: error.message
    });
  }
};

// Initialize on mount
onMounted(async () => {
  await initializeRecorder();
  
  VideoRecorder.addListener('startedRecording', () => {
    console.log('Recording started event received');
  });
  
  VideoRecorder.addListener('stoppedRecording', stopRecording);
});

// Clean up on unmount
onBeforeUnmount(() => {
  if (isRecording.value) {
    VideoRecorder.stopRecording().catch(console.error);
  }
  
  if (videoUrl.value && !Capacitor.isNativePlatform()) {
    URL.revokeObjectURL(videoUrl.value);
  }
  
  VideoRecorder.removeAllListeners();
});
</script>