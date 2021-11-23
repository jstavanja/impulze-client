import { defineStore } from 'pinia'
import { Impulze } from '../types/Impulze'
import { ImpulzeWithInterval } from '../types/Interval'
import { impulzesAreEqual } from '../utils/comparison'

const triggerNativeNotification = async (title: string, body: string) => {
  (async () => {
    try {
      await Notification.requestPermission()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _n = new Notification(title, {
        body
      })
    } catch (error) {
      // TODO: add a toast notification
      console.warn(error)
    }
  })()
}

const generateImpulzeInterval = (impulze: Impulze) => {
  return window.setInterval(() => {
    triggerNativeNotification(impulze.name, impulze.description)
  }, impulze.period)
}

export const useImpulzeStore = defineStore('impulzes', {
  state: () => {
    return {
      activeImpulzes: [] as ImpulzeWithInterval[],
    }
  },
  getters: {
    impulzeIsActive (state) {
      return (impulze: Impulze) => {
        return state.activeImpulzes.findIndex(
          activeImpulze => {
            return impulzesAreEqual(activeImpulze.impulze, impulze)
          }
        ) > -1
      }
    }
  },
  actions: {
    activateImpulze (impulze: Impulze) {
      const impulzeAlreadyActive = this.impulzeIsActive(impulze)
      if (!impulzeAlreadyActive) {
        const intervalId = generateImpulzeInterval(impulze)
        const impulzeInterval: ImpulzeWithInterval = {
          impulze,
          intervalId
        }
        this.activeImpulzes.push(impulzeInterval)
      }
    },
    deactivateImpulze (impulze: Impulze) {
      const activeImpulzeIndex = this.activeImpulzes.findIndex(activeImpulze => impulzesAreEqual(activeImpulze.impulze, impulze))
      const activeImpulze = this.activeImpulzes[activeImpulzeIndex]

      if (activeImpulzeIndex > -1) {
        clearInterval(activeImpulze.intervalId)
        this.activeImpulzes.splice(activeImpulzeIndex, 1)
      }
    },
    activateImpulzes (impulzes: Impulze[]) {
      impulzes.forEach(impulze => {
        this.activateImpulze(impulze)
      })
    },
    deactivateAllImpulzes () {
      const impulzesToDeactivate = [...this.activeImpulzes]
      impulzesToDeactivate.forEach(activeImpulze => {
        this.deactivateImpulze(activeImpulze.impulze)
      })
    },
  },
})
