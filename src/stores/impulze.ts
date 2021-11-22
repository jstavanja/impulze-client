import { defineStore } from 'pinia'
import { Impulze } from '../types/Impulze'

export const useImpulzeStore = defineStore('impulzes', {
  state: () => {
    return {
      activeImpulzes: [] as Impulze[],
    }
  },
  getters: {
    impulzeIsActive (state) {
      return (impulze: Impulze) => state.activeImpulzes.indexOf(impulze) > -1
    }
  },
  actions: {
    activateImpulze (impulze: Impulze) {
      if (!this.activeImpulzes.includes(impulze)) {
        this.activeImpulzes.push(impulze)
      }
    },
    deactivateImpulze (impulze: Impulze) {
      this.activeImpulzes.splice(this.activeImpulzes.indexOf(impulze), 1)
    },
    activateImpulzes (impulzes: Impulze[]) {
      this.activeImpulzes = [...impulzes]
    },
    deactivateAllImpulzes () {
      this.activeImpulzes = []
    },
  },
})
