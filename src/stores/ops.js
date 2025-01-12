import { defineStore } from 'pinia'
import { Notify } from 'quasar'
import apiService from 'src/api/axiosInstance'

export const useOperations = defineStore('ops', {
  state: () => ({
    myDependants: [],
    myContacts: [],
  }),
  actions: {
    async getMyDependant() {
      try {
        const res = await apiService.getMyDependants()
        if (res.status === 200) {
          this.myDependants = res.data
        }
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error,
        })
      }
    },
    async getMyContacts() {
      try {
        const res = await apiService.getMyContacts()
        if (res.status === 200) {
          this.myContacts = res.data
        }
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error,
        })
      }
    },
    async createRelations(data) {
      try {
        const res = await apiService.createRelation(data)
        if (res.status === 201) {
          Notify.create({
            type: 'positive',
            message: res.data.message || 'Contact created successfully',
          })
        }
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error,
        })
      }
    },
    async dependantApproval(data) {
      try {
        const res = await apiService.approveDependant(data)
        if (res.status === 201) {
          Notify.create({
            type: 'positive',
            message: 'Approval successful',
          })
        }
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error,
        })
      }
    },
    async dependantReject(data) {
      try {
        const res = await apiService.rejectDependant(data)
        if (res.status === 201) {
          Notify.create({
            type: 'positive',
            message: 'Rejection successful',
          })
        }
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error,
        })
      }
    },
    async contactDelete(data) {
      try {
        const res = await apiService.deleteContact(data)
        if (res.status === 201) {
          Notify.create({
            type: 'positive',
            message: 'Contact deletion successful',
          })
        }
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error,
        })
      }
    },
    async contactUpdate(data) {
      try {
        const res = await apiService.updateContact(data)
        if (res.status === 201) {
          Notify.create({
            type: 'positive',
            message: 'Contact update successful',
          })
        }
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error,
        })
      }
    },
    async alertTrigger(data) {
      try {
        const res = await apiService.triggerAlert(data)
        if (res.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Alert triggered successful',
          })
        }
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error,
        })
      }
    },
  },
})
