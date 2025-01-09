<template>
  <div>
    <q-dialog v-model="dialogOpen" persistent>
      <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div><q-icon :name="fasExclamation" /> <span>Heads Up</span></div>
            <div class="text-h5 q-mt-sm q-mb-xs">
              <span>{{ cardName1 }}</span
              ><span>{{ cardName2 }}</span>
            </div>
            <div class="text-caption text-grey">
              {{ message }}
            </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders" :src="cardImage" />
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions align="around">
          <q-btn
            v-for="(button, index) in buttons"
            :key="index"
            flat
            @click="TriggerAction(button)"
          >
            {{ button.label }}
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { fasExclamation } from '@quasar/extras/fontawesome-v6'
import axios from 'src/boot/axios'
const dialogOpen = ref(false)
console.log('trig', dialogOpen)
const props = defineProps({
  card: Boolean,
  cardName1: String,
  cardName2: String,
  cardImage: String,
  message: String,
  notAuth: Boolean,
})

const emit = defineEmits(['close'])

const TriggerAction = async () => {
  try {
    const geolocation = await getGeolocation()
    await axios({ alertType: props.cardName1, location: geolocation })
  } catch (error) {
    emit('close')
    console.log(error)
  }
}

const getGeolocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Geolocation is not supported by your browser')
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject('User denied the request for Geolocation.')
              break
            case error.POSITION_UNAVAILABLE:
              reject('Location information is unavailable.')
              break
            case error.TIMEOUT:
              reject('The request to get user location timed out.')
              break
            default:
              reject('An unknown error occurred while retrieving location.')
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 },
      )
    }
  })
}

// watch(
//   () => props.card,
//   (newVal) => {
//     trigger.value = newVal
//     console.log('trig val', trigger.value)
//     console.log('new val', newVal)
//   },
// )
</script>

<style lang="scss" scoped></style>
