<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md q-ma-sm">
      <q-table
        flat
        bordered
        title="My Emergency Contact"
        subtitle="List of relations you can count on during an emergency. The information can be updated."
        :rows="rows"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body-cell-action="props">
          <div class="q-px-md row flex-nowrap q-my-xs q-gutter-x-md justify-between">
            <q-btn color="primary" label="Edit" @click="editRow(props.row)" size="md" />
            <q-btn color="negative" label="Delete" @click="deleteRow(props.row)" size="md" />
          </div>
        </template>
        <template v-slot:body-cell-name="props">
          <div
            class="q-px-lg text-center q-my-xs q-gutter-x-md column"
            style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
          >
            <div class="w-auto font-bold">{{ props.row.name }}</div>
            <div class="w-auto">{{ props.row.email }}</div>
          </div>
        </template>
      </q-table>
    </q-card>
    <q-card class="q-pa-md q-ma-sm">
      <q-table
        flat
        bordered
        title="My Dependents"
        subtitle="List of relations who count on you during emergency situations. The information can be updated."
        :rows="rows"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body-cell-action="props">
          <div class="q-px-md row flex-nowrap q-my-xs q-gutter-x-md justify-between">
            <q-btn color="primary" label="Accept" @click="acceptRow(props.row)" size="md" />

            <q-btn color="negative" label="Reject" @click="rejectRow(props.row)" size="md" />
          </div>
        </template>
        <template v-slot:body-cell-name="props">
          <div
            class="q-px-lg text-center q-my-xs q-gutter-x-md column"
            style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
          >
            <div class="w-auto font-bold">{{ props.row.name }}</div>
            <div class="w-auto">{{ props.row.email }}</div>
          </div>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>
<script setup>
// import { ref } from 'vue'
const editRow = (row) => {
  console.log('Edit row', row)
}
const deleteRow = (row) => {
  console.log('delete row', row)
}
// import { ref } from 'vue'
const acceptRow = (row) => {
  console.log('accept row', row)
}
const rejectRow = (row) => {
  console.log('reject row', row)
}
const columns = [
  {
    name: 'name',
    required: true,
    label: 'NAME',
    align: 'center',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: 'phone_number', align: 'center', label: 'PHONE NUMBER', field: 'phone_number' },
  { name: 'relation', label: 'RELATION', align: 'center', field: 'relation' },
  { name: 'status', label: 'STATUS', align: 'center', field: 'status' },
  { name: 'action', label: 'ACTION', align: 'center', field: 'action' },
]

const rows = [
  {
    name: 'Frozen Yogurt',
    email: 'max@gmail.com',
    phone_number: 159,
    relation: 6.0,
    status: 24,
    action: 4.0,
  },
  {
    name: 'Ice cream sandwich',
    email: 'cream@yet.com',
    phone_number: 237,
    relation: 9.0,
    status: 37,
    action: 4.3,
  },
  {
    name: 'Ice cream sandwich',
    email: 'crea@gmail.com',
    phone_number: 237,
    relation: 9.0,
    status: 37,
    action: 4.3,
  },
  {
    name: 'Ice cream sandwicsdsdsdsdsh',
    email: 'creasd@gmail.com',
    phone_number: 237,
    relation: 9.0,
    status: 37,
    action: 4.3,
  },
]
</script>
