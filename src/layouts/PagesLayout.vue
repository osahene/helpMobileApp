<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="bg-accent">
      <div class="relative">
        <div class="px-4 md:px-10 mx-auto w-full">
          <router-view />
          <q-footer>
            <q-tabs v-model="tab" align="justify" dense class="bg-teal text-yellow shadow-2">
              <q-route-tab to="/pages/home" name="home" icon="home" class="q-pa-sm" />
              <q-route-tab to="/pages/edit" name="edit" icon="edit" />
              <q-route-tab to="/pages/list" name="lists" icon="list">
                <q-badge color="purple" text-color="white" floating>5+</q-badge>
              </q-route-tab>
              <q-route-tab name="more" icon="more" />
            </q-tabs>
          </q-footer>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const tab = ref('home')
</script>

<style></style>
