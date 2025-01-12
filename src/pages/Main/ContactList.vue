<template>
  <div class="h-screen top-5 relative">
    <div class="rounded-t mb-0 px-0 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full">
          <div class="block w-full overflow-x-auto">
            <q-table
              class="my-sticky-header-column-table"
              flat
              bordered
              title="My Emergency Contact"
              subtitle="List of relations you can count on during an emergency. The information can be updated."
              :rows="contactsRows"
              :columns="columns"
              row-key="name"
              style="table-layout: auto"
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
                  style="
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    min-width: 150px;
                  "
                >
                  <div class="w-auto font-bold"><span>{{ props.row.first_name }}</span> <span>{{ props.row.last_name }}</span></div>
                  <div class="w-auto">{{ props.row.email_address }}</div>
                </div>
              </template>
            </q-table>
          </div>
        </div>
      </div>
    </div>
    <div class="rounded-t mb-10 px-0 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <div class="block w-full overflow-x-auto">
            <q-table
              class="my-sticky-header-column-table"
              flat
              bordered
              title="My Dependents"
              subtitle="List of relations who count on you during emergency situations. The information can be updated."
              :rows="dependantsRows"
              :columns="columns"
              row-key="name"
              style="table-layout: auto"
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
                  style="
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    min-width: 150px;
                  "
                >
                  <div class="w-auto font-bold">{{ props.row.name }}</div>
                  <div class="w-auto">{{ props.row.email }}</div>
                </div>
              </template>
            </q-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted } from 'vue'
import { useOperations } from 'src/stores/ops'

const ops = useOperations()

onMounted(async () => {
  await ops.getMyContacts()
  await ops.getMyDependant()
})

const columns = [
  {
    name: 'name',
    required: true,
    label: 'NAME & EMAIL',
    align: 'center',
    field: (row) => row.first_name,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: 'phone_number', align: 'center', label: 'PHONE NUMBER', field: 'phone_number' },
  { name: 'relation', label: 'RELATION', align: 'center', field: 'relation' },
  { name: 'status', label: 'STATUS', align: 'center', field: 'status' },
  { name: 'action', label: 'ACTION', align: 'center', field: 'action' },
]

const contactsRows = computed(() => ops.myContacts || []);
const dependantsRows = computed(() => ops.myDependants || []);

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

</script>
<style lang="sass">
.my-sticky-header-column-table
  /* height or max-height is important */
  height: 100%

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  max-width: 100%

  td:first-child
    /* bg color is important for td; just specify one */
    background-color: #c1f4cd !important

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #fff

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
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
</style>
