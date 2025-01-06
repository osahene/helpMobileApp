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
          <img
            class="w-auto"
            :src="props.row.image"
            alt="Agency Logo"
            style="height: 40px; width: auto"
          />
          <div class="w-auto font-bold">{{ props.row.name }}</div>
        </div>
      </template>
      <template v-slot:body-cell-cont_1="props">
        <a :href="`tel:${props.row.cont_1}`" class="text-primary">{{ props.row.cont_1 }}</a>
      </template>
      <template v-slot:body-cell-cont_2="props">
        <a :href="`tel:${props.row.cont_2}`" class="text-primary">{{ props.row.cont_2 }}</a>
      </template>
      <template v-slot:body-cell-cont_3="props">
        <a v-if="props.row.cont_3" :href="`tel:${props.row.cont_3}`" class="text-primary">{{
          props.row.cont_3
        }}</a>
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
