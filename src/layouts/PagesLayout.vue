<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container class="bg-cust-white">
      <div class="relative">
        <div class="md:px-10 mx-auto w-full">
          <router-view />
          <q-footer>
            <q-tabs v-model="tab" align="justify" dense class="bg-white text-red shadow-2">
              <q-route-tab to="/pages/home" name="home" icon="home" class="q-pa-sm" />
              <!-- <q-route-tab to="/pages/report" name="report" icon="fa-solid fa-bullhorn" class="q-pa-sm" /> -->
              <q-route-tab to="/pages/edit" name="edit" icon="edit" />
              <q-route-tab to="/pages/list" name="lists" icon="list">
                <q-badge v-if="pendingCount > 0" color="purple" text-color="white" floating>{{
                  pendingCount
                }}</q-badge>
              </q-route-tab>
              <q-route-tab to="/pages/more" name="more" icon="more" />
            </q-tabs>
          </q-footer>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useOperations } from 'src/stores/ops'
const tab = ref('home')
const ops = useOperations()

onMounted(async () => {
  await ops.getMyContacts()
  await ops.getMyDependant()
})

const countDeps = computed(() => ops.myDependants || [])

const pendingCount = computed(() => {
  return countDeps.value.filter((dep) => dep.status === 'pending').length
})
</script>
