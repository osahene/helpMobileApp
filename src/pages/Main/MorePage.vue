<template>
  <div class="h-screen">
    <div class="q-pa-xs">
      <div class="q-gutter-y-md" style="max-width: 600px">
        <q-card>
          <q-tabs
            v-model="tab"
            dense
            class="bg-grey-2 text-grey-7"
            active-color="primary"
            indicator-color="purple"
            align="justify"
          >
            <q-tab name="tips" label="Safety Tips" />
            <q-tab name="emergency" label="Emergency Lines" />
          </q-tabs>

          <q-tab-panels v-model="tab" animated class="q-pa-none bg-opacity-95 text-white">
            <q-tab-panel v-show="tab === 'tips'" name="tips" class="q-gutter-y-sm">
              <!-- cards -->

              <Tips :card-title="healthTips[0].mTitle" :tips="healthTips.slice(1)" />
              <Tips :card-title="floodTips[0].mTitle" :tips="floodTips.slice(1)" />
              <Tips :card-title="fireTips[0].mTitle" :tips="fireTips.slice(1)" />
              <!-- cardsEnd -->
            </q-tab-panel>

            <q-tab-panel name="emergency">
              <div class="text-h6">Alarms</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Tips from 'src/components/TipsCard.vue'
const tab = ref('tips')

const healthTips = [
  { mTitle: 'Emergency Tips' },
  {
    vidLink: 'https://www.youtube.com/watch?v=qvf_74DM880',
    title: 'Cardia Arrest management',
  },
  {
    vidLink: 'https://www.youtube.com/watch?v=Ovsw7tdneqE',
    title: 'Seizure management',
  },
  {
    vidLink: 'https://www.youtube.com/watch?v=2v8vlXgGXwE',
    title: 'Bone fracture - First aid',
  },
  {
    vidLink: 'https://www.youtube.com/watch?v=hdVKpUR513M',
    title: 'Asthma attack - First aid',
  },
  {
    vidLink: 'https://www.youtube.com/watch?v=-hnyxw5k-c0',
    title: 'Deep cut - First aid',
  },
  {
    vidLink: 'https://www.youtube.com/watch?v=lLkw4BXa7pQ',
    title: 'Snake bite - First aid',
  },
]
const floodTips = [
  { mTitle: 'Flood Tips' },
  {
    vidLink: 'https://www.youtube.com/watch?v=43M5mZuzHF8',
    title: 'Flood management',
  },
  {
    vidLink: 'https://www.youtube.com/watch?v=Hlrbio-NpxQ',
    title: 'Drowning - First aid',
  },
  {
    vidLink: 'https://www.youtube.com/watch?v=luTRnCoeD4c',
    title: 'Electrocution - First aid',
  },
]
const fireTips = [
  { mTitle: 'Flood Tips' },
  {
    vidLink: 'https://www.youtube.com/watch?v=IHswAPDhVyU',
    title: 'Fire Safety',
  },
  {
    vidLink: 'https://www.youtube.com/watch?v=dtyl3u3R8wM',
    title: 'Extinguisher Usage - First aid',
  },
  {
    vidLink: 'https://www.youtube.com/watch?v=NOvnZRzFthg',
    title: 'Burns - First aid',
  },
]
</script>
