import { defineStore } from 'pinia'
import { Impulze } from '../types/Impulze'
import { ImpulzeWithInterval } from '../types/Interval'
import { impulzesAreEqual } from '../utils/comparison'

const requestNativeNotificationPermission = async () => {
  try {
    await Notification.requestPermission()

    if (Notification.permission !== 'granted') {
      alert('Your notifications will not be delivered to you if you do not give the correct permissions to the browser.')
      return false
    }

    return true
  } catch {
    // TODO: add toast notification
    alert('Your notifications will not be delivered due to a browser error, please try reloading the page.')
    return false
  }
}

const triggerNativeNotification = async (title: string, body: string) => {
  // eslint-disable-next-line no-new
  new Notification(title, {
    body
  })
}

const generateImpulzeInterval = async (impulze: Impulze) => {
  let canActivateImpulze = Notification.permission === 'granted'

  // upon first impulze activation, ask for permission
  if (!canActivateImpulze) {
    canActivateImpulze = await requestNativeNotificationPermission()
  }

  // if the permission was given, trigger the notification
  if (canActivateImpulze) {
    return window.setInterval(() => {
      triggerNativeNotification(impulze.name, impulze.description)
    }, impulze.period)
  }

  return null
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
    async activateImpulze (impulze: Impulze) {
      const impulzeAlreadyActive = this.impulzeIsActive(impulze)
      if (!impulzeAlreadyActive) {
        const intervalId = await generateImpulzeInterval(impulze)
        if (intervalId) {
          const impulzeInterval: ImpulzeWithInterval = {
            impulze,
            intervalId
          }
          this.activeImpulzes.push(impulzeInterval)
        }
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
    async activateImpulzes (impulzes: Impulze[]) {
      for (const impulze of impulzes) {
        await this.activateImpulze(impulze)
      }
    },
    deactivateAllImpulzes () {
      const impulzesToDeactivate = [...this.activeImpulzes]
      impulzesToDeactivate.forEach(activeImpulze => {
        this.deactivateImpulze(activeImpulze.impulze)
      })
    },
  },
})
