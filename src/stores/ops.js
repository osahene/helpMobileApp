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
          this.myDependants = res.data.results.map((item) => ({
            ...item,
          }))
        }
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error.response?.data?.error || 'No dependants found',
        })
      }
    },
    async getMyContacts() {
      try {
        const res = await apiService.getMyContacts()
        if (res.status === 200) {
          this.myContacts = res.data.results.map((item) => ({
            ...item,
          }))
        }
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error.response?.data?.error || 'No contacts found',
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
        console.log('Error creating relation:', error)
        Notify.create({
          type: 'negative',
          message: 'Error creating relation',
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
        console.log('Error approving dependant:', error)
        Notify.create({
          type: 'negative',
          message: 'Error approving dependant',
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
          message: error.response?.message || 'Error rejecting dependant',
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
          message: error.response?.message || 'Error deleting contact',
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
          message: error.response?.message || 'Error updating contact',
        })
      }
    },
    async alertTrigger(data) {
      try {
        const res = await apiService.triggerAlert(data)
        if (res.status === 201) {
          Notify.create({
            type: 'positive',
            message: res.data.message || 'Alert triggered successfully',
          })
        }
      } catch (error) {
        Notify.create({
          type: 'negative',
          message:
            error.response.message || error.response.data.message || 'Failed triggering alert',
        })
      }
    },
  },
})
