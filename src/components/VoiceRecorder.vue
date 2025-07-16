<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <div class="text-h6">Voice Recorder</div>

      <!-- Initial state: Ready to record -->
      <div v-if="!isRecording && !audioBlob" class="text-center q-my-md">
        <q-btn round color="primary" icon="mic" @click="startRecording" />
      </div>
      
      <!-- Recording state -->
      <div v-if="isRecording">
        <div ref="waveform" class="waveform-container"></div>
        <div class="text-center q-mt-sm">
          Recording: {{ formatTime(recordingTime) }} 
          <span v-if="isPaused" class="text-warning">(Paused)</span>
        </div>
        <div class="row justify-center q-mt-md q-gutter-md">
          <q-btn 
            round 
            :color="isPaused ? 'positive' : 'warning'" 
            :icon="isPaused ? 'play_arrow' : 'pause'" 
            @click="togglePauseResumeRecording" 
          />
          <q-btn round color="negative" icon="stop" @click="stopRecording" />
        </div>
      </div>
      
      <!-- Playback state -->
      <div v-if="audioBlob" class="q-mt-md">
        <div ref="waveformPlayback" class="waveform-container"></div>
        <div class="row justify-center q-mt-md q-gutter-md">
          <q-btn round flat :icon="isPlaying ? 'pause' : 'play_arrow'" @click="togglePlayPause" />
          <q-btn round flat icon="fast_forward" @click="togglePlaybackRate" />
          <q-btn round flat icon="delete" color="negative" @click="deleteRecording" />
        </div>
        <div class="text-center">
          Playback speed: {{ playbackRate }}x
        </div>
      </div>
      
      <!-- Linear progress bar during recording -->
      <q-linear-progress 
        v-if="isRecording"
        stripe
        rounded
        size="10px"
        :value="recordingTime / maxDuration" 
        color="warning"
        class="q-mt-md"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onBeforeUnmount, nextTick } from 'vue'
import { useQuasar } from 'quasar'
// import { Capacitor } from '@capacitor/core'
import { CapacitorVoiceRecorder } from '@lgicc/capacitor-voice-recorder'
import WaveSurfer from 'wavesurfer.js'

const $q = useQuasar()
const isRecording = ref(false)
const isPaused = ref(false) // New state for recording pause/resume
const audioBlob = ref(null)
const audioUrl = ref('')
const recordingTime = ref(0)
const playbackRate = ref(1)
const isPlaying = ref(false)
const waveform = ref(null)
const waveformPlayback = ref(null)
let wavesurferInstance = null
let timer = null
const maxDuration = 120 // 2 minutes in seconds

// onMounted(async () => {
//   if (Capacitor.isNativePlatform()) {
//     try {
//       await CapacitorVoiceRecorder.requestAudioRecordingPermission()
//     } catch (error) {
//       $q.notify({ type: 'negative', message: `Permission request failed: ${error.message || error}` })
//     }
//   }
// })

onBeforeUnmount(() => {
  if (wavesurferInstance) wavesurferInstance.destroy()
  if (timer) clearInterval(timer)
})

const startRecording = async () => {
  try {
    if (typeof CapacitorVoiceRecorder !== 'undefined' && CapacitorVoiceRecorder.startRecording) {
      console.log('Starting recording...')
      await CapacitorVoiceRecorder.startRecording()
      isRecording.value = true
      isPaused.value = false; // Ensure not paused when starting
      audioBlob.value = null; // Clear previous recording
      audioUrl.value = '';
      recordingTime.value = 0
      isPlaying.value = false; // Ensure playback state is false

      await nextTick();
      
      // Start timer
      timer = setInterval(() => {
        recordingTime.value++
        if (recordingTime.value >= maxDuration) {
          stopRecording()
        }
      }, 1000)
    } else {
      $q.notify({ type: 'negative', message: 'Voice Recorder plugin not available.' })
    }
  } catch (error) {
    $q.notify({ type: 'negative', message: `Recording failed to start: ${error.message || error}` })
  }
}

const togglePauseResumeRecording = async () => {
  try {
    if (isPaused.value) {
      await CapacitorVoiceRecorder.resumeRecording();
      isPaused.value = false;
      // Restart timer
      timer = setInterval(() => {
        recordingTime.value++
        if (recordingTime.value >= maxDuration) {
          stopRecording()
        }
      }, 1000)
    } else {
      console.log('Pausing recording...')
      await CapacitorVoiceRecorder.pauseRecording();
      isPaused.value = true;
      // Clear timer when paused
      clearInterval(timer);
    }
  } catch (error) {
    $q.notify({ type: 'negative', message: `Failed to toggle recording pause/resume: ${error.message || error}` });
  }
}

const stopRecording = async () => {
  try {
    if (typeof CapacitorVoiceRecorder !== 'undefined' && CapacitorVoiceRecorder.stopRecording) {
      const recording = await CapacitorVoiceRecorder.stopRecording()
      isRecording.value = false
      isPaused.value = false; 
      clearInterval(timer)

      if (recording && recording.base64) {
        audioBlob.value = recording.base64
        audioUrl.value = `data:audio/aac;base64,${audioBlob.value}`
        
        await nextTick();

        if (wavesurferInstance) wavesurferInstance.destroy();
        wavesurferInstance = WaveSurfer.create({
          container: waveformPlayback.value,
          waveColor: '#1976D2',
          progressColor: '#0D47A1',
          cursorColor: '#FF5722',
          barWidth: 2,
          barRadius: 3,
          cursorWidth: 1,
          height: 100,
          barGap: 2,
          responsive: true
        });

        wavesurferInstance.load(audioUrl.value);

        wavesurferInstance.on('play', () => {
          isPlaying.value = true;
        });
        wavesurferInstance.on('pause', () => {
          isPlaying.value = false;
        });
        wavesurferInstance.on('finish', () => {
          isPlaying.value = false;
          wavesurferInstance.seekTo(0);
        });

      } else {
        $q.notify({ type: 'negative', message: 'No valid audio data (base64) received from recording.' })
      }
    } else {
      $q.notify({ type: 'negative', message: 'Voice Recorder plugin not available to stop recording.' })
    }
  } catch (error) {
    $q.notify({ type: 'negative', message: `Recording failed to stop: ${error.message || error}` })
  }
}

const togglePlayPause = () => {
  if (wavesurferInstance) {
    if (isPlaying.value) {
      wavesurferInstance.pause();
    } else {
      wavesurferInstance.play();
    }
  }
}

const togglePlaybackRate = () => {
  playbackRate.value = playbackRate.value === 1 ? 1.5 : playbackRate.value === 1.5 ? 2 : 1
  if (wavesurferInstance) {
    wavesurferInstance.setPlaybackRate(playbackRate.value);
  }
}

const deleteRecording = () => {
  audioBlob.value = null
  audioUrl.value = ''
  isPlaying.value = false;
  if (wavesurferInstance) {
    wavesurferInstance.destroy()
    wavesurferInstance = null;
  }
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}
</script>

<style scoped>
.waveform-container {
  width: 100%;
  height: 100px;
  background: #f5f5f5;
  border-radius: 5px;
}
</style>