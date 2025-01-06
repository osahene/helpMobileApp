<template>
  <div>
    <q-table
      class="my-sticky-header-column-table"
      flat
      bordered
      :title="titles"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body-cell-name="props">
        <div
          class="q-px-lg text-center q-my-xs q-gutter-x-md flex flex-row align-middle items-center"
          style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 150px"
        >
          <q-icon
            class="w-auto"
            :name="props.row.iconName"
            alt="Contacts Icon"
            style="height: 20px; width: auto"
          />
          <div class="w-auto font-bold">{{ props.row.name }}</div>
        </div>
      </template>
      <template v-slot:body-cell-actions="props">
        <a
          v-if="props.row.name === 'Phone Call'"
          :href="`tel:${props.row.actions}`"
          class="text-primary"
          >{{ props.row.actions }}</a
        >
        <a v-else :href="props.row.link" class="text-primary">{{ props.row.actions }}</a>
      </template>
    </q-table>
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
})

watchEffect(() => props)
</script>
<style lang="sass">
.my-sticky-header-column-table
  /* height or max-height is important */
  height: 310px
  max-width: 600px

  td:first-child
    background-color: #00b4ff

  tr th
    position: sticky
    z-index: 2
    background: #00b4ff
  thead tr:last-child th
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
