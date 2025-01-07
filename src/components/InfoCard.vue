<template>
  <div>
    <div class="relative border-2 border-gray-200 overflow-x-auto shadow-lg sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption
          class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800"
        >
          {{
            titles
          }}
          <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            {{ describe }}
          </p>
        </caption>
        <thead
          class="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th v-for="(col, index) in columns" :key="index" scope="col" class="px-6 py-3">
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in rows"
            :key="rowIndex"
            class="text-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          >
            <td
              scope="row"
              class="flex px-2 py-2 items-center self-center justify-center font-medium text-gray-900 whitespace-normal dark:text-white"
            >
              <div class="flex items-center gap-2 w-full">
                <!-- Icon -->
                <q-icon
                  v-if="row.main === 'action' || row.main === 'action call'"
                  :name="row.iconName"
                  size="sm"
                  class="flex-shrink-0"
                />
                <!-- Image -->
                <img
                  v-if="row.main === 'agent'"
                  :src="row.image"
                  class="h-12 w-12 flex-shrink-0"
                  alt="Row image"
                />
                <!-- Name -->
                <span class="flex-1 text-left break-words">
                  {{ row.name }}
                </span>
              </div>
            </td>

            <td class="px-2 py-2">
              <a v-if="row.main === 'action'" :href="row.link"> {{ row.actions }}</a>
              <a v-else-if="row.main === 'action call'" :href="`tel:${row.link}`">
                {{ row.actions }}</a
              >
              <a v-else :href="`tel:${row.cont_1}`"> {{ row.cont_1 }}</a>
            </td>
            <td class="px-2 py-2">
              <a :href="`tel:${row.cont_2}`">{{ row.cont_2 }}</a>
            </td>
            <td class="px-2 py-2">
              <a :href="`tel:${row.cont_3}`">{{ row.cont_3 }}</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { watchEffect } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
    default: () => [],
  },
  titles: {
    type: String,
    required: true,
  },
  describe: {
    type: String,
    required: true,
  },
})

watchEffect(() => props)
</script>
