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
    <EditInfo 
    v-if="cardInfo" 
    v-model="openEdit" 
    :first_name="cardInfo.first_name" 
    :last_name="cardInfo.last_name" 
    :email_address="cardInfo.email_address" 
    :phone_number="cardInfo.phone_number" 
    :relation="cardInfo.relation" 
    :buttons="buttonAction"
    @update-field="editCardInfo"
    />
    <MoreActions
    v-if="cardInfo"
    v-model="mainAction"
    :action-icon="actionIcons"
    :action-type="toDoTask"
    :message="actionMessage"
    :buttons="actionButtons"
    />
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useOperations } from 'src/stores/ops';
import EditInfo from 'src/components/EditInfo.vue'
import MoreActions from 'src/components/moreActions.vue';
import { farPenToSquare, fasXmark, fasCircleCheck, farTrashCan, farCircleXmark } from '@quasar/extras/fontawesome-v6';
const cancel = fasXmark
const edit = farPenToSquare
const approve = fasCircleCheck
const del = farTrashCan
const rej = farCircleXmark
const ops = useOperations()
const toDoTask = ref('')
const openEdit = ref(false)
const mainAction =  ref(false)
const cardInfo = ref(null)


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

const actionMessage = computed(() => {
 if (!cardInfo.value) {
    return { text: 'No action selected' };
  }
  const name = `${cardInfo.value.first_name} ${cardInfo.value.last_name}`;
  switch (toDoTask.value) {
    case 'delete':
      return { text: `Do you want to delete ${name} from your emergency list?`, highlight: name };
    case 'approve':
      return { text: `Do you want to approve ${name} as your dependant?`, highlight: name };
    case 'reject':
      return { text: `Do you want to reject ${name} as your dependant?`, highlight: name };
    default:
      return { text: 'No action selected' };
  }
})


const actionButtons = computed(() => {
   switch (toDoTask.value) {
    case 'delete':
      return [
        { label: 'Delete', icon: del, color: 'deep-orange', action: deleteCardInfo },
        { label: 'Cancel', icon: cancel, action: onClose },
      ]
    case 'approve':
      return [
        { label: 'Approve', icon: approve, color: 'secondary', action: approveCardInfo },
        { label: 'Cancel', icon: cancel, action: onClose },
      ]
    case 'reject':
      return [
        { label: 'Reject', icon: rej, color: 'deep-orange', action: rejectCardInfo },
        { label: 'Cancel', icon: cancel, action: onClose },
      ]
    default:
      return []
  }
})

const actionIcons = computed(() => {
 switch (toDoTask.value) {
    case 'delete':
      return [{ name: del, color: 'deep-orange' }]
    case 'approve':
      return [{ name: approve, color: 'secondary' }]
    case 'reject':
      return [{ name: rej, color: 'deep-orange' }]
    default:
      return []
  }
})

const onClose = () => {
  openEdit.value = false
  mainAction.value = false
}

const buttonAction = computed(() => {
  return [
    { label: 'Edit Info', icon: edit, action: editCardInfo }, { label: 'Cancel', icon: cancel, action: onClose }
  ]
})

const editCardInfo = async (updatedData) => {
  if (cardInfo.value) {
    Object.assign(cardInfo.value, updatedData)
    await ops.contactUpdate(cardInfo.value)
    openEdit.value = false
  }
}
const deleteCardInfo = async () => {
  const deleteForm = new FormData
  deleteForm.append('pk', cardInfo.value.pk)
  await ops.contactDelete(deleteForm)
  mainAction.value = false
}
const approveCardInfo = async () => {
  const approveForm = new FormData
  approveForm.append('id', cardInfo.value.id)
  await ops.dependantApproval(approveForm)
}
const rejectCardInfo = async () => {
  const rejectForm = new FormData
  rejectForm.append('id', cardInfo.value.id)
  await ops.dependantReject(rejectForm)
}

const editRow = (row) => {
  openEdit.value = true
  cardInfo.value = row
}

const deleteRow = (row) => {
  toDoTask.value = 'delete'
  mainAction.value = true
  cardInfo.value = row
}

const acceptRow = (row) => {
  toDoTask.value = 'approve'
  mainAction.value = true
  cardInfo.value = row
  console.log('accept row', row)
}
const rejectRow = (row) => {
  toDoTask.value= 'reject'
  mainAction.value = true
  cardInfo.value = row
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
