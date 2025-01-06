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

            <q-tab-panel name="emergency" class="q-gutter-y-lg">
              <InfoCard :titles="EmerTit" :columns="cols" :rows="agents" />
              <ContactCard :titles="ContactTit" :columns="ContactCols" :rows="ContactAction" />
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
import InfoCard from 'src/components/InfoCard.vue'
import ContactCard from 'src/components/ContactCard.vue'
import police from '../../assets/emerg/police.png'
import fire from '../../assets/emerg/GNFS.jpg'
import nadmo from '../../assets/emerg/nadmo.jpg'
import amb from '../../assets/emerg/ambulance.jpg'
import elec from '../../assets/emerg/ecg.jpg'
import { fabFacebook, fabTwitter, fabWhatsapp, fasPhone } from '@quasar/extras/fontawesome-v6'
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
  { mTitle: 'Fire Tips' },
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
const EmerTit = 'Emergency Lines'
const ContactTit = 'Contact Us'
const ContactCols = [
  {
    name: 'name',
    required: true,
    label: 'Medium',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'actions',
    align: 'center',
    label: 'Action',
    field: 'actions',
  },
]
const ContactAction = [
  {
    name: 'WhatsApp',
    iconName: fabWhatsapp,
    actions: '+233506053020',
    link: 'https://wa.me/233506053020',
  },
  {
    name: 'Facebook',
    iconName: fabFacebook,
    actions: 'Visit Facebook',
    link: 'https://facebook.com/home',
  },
  {
    name: 'Twitter',
    iconName: fabTwitter,
    actions: 'Visit Twitter',
    link: 'https://twitter.com/home',
  },
  {
    name: 'Phone Call',
    iconName: fasPhone,
    actions: '+233546045726',
  },
]
const cols = [
  {
    name: 'name',
    required: true,
    label: 'Agency',
    align: 'left',
    field: (row) => row.name,
    // field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'cont_1',
    align: 'center',
    label: 'Contact 1',
    field: 'cont_1',
  },
  {
    name: 'cont_2',
    align: 'center',
    label: 'Contact 2',
    field: 'cont_2',
  },
  { name: 'cont_3', align: 'center', label: 'Contact 3', field: 'cont_3' },
]
const agents = [
  {
    name: 'Police Service',
    image: police,
    cont_1: '191',
    cont_2: '18555',
    cont_3: '+233302773906',
  },
  {
    name: 'Fire Service',
    image: fire,
    cont_1: '192',
    cont_2: '+233302772446',
    cont_3: '+233299340383',
  },
  {
    name: 'Ambulance',
    image: amb,
    cont_1: '+2330501614877',
    cont_2: '+2330505982870',
    cont_3: '',
  },
  {
    name: 'NADMO',
    image: nadmo,
    cont_1: '112',
    cont_2: '+233299350030',
    cont_3: '+233302964884',
  },
  {
    name: 'ECG',
    image: elec,
    cont_1: '+233302676727',
    cont_2: '+233302611611',
    cont_3: '+233302676728',
  },
]
</script>
