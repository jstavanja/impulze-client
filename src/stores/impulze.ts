import { defineStore } from 'pinia'
import { Impulze, ImpulzeResponse } from '../types/Impulze'
import { ImpulzeResponseWithMetadata } from '../types/Interval'
import { ref } from 'vue'

const IMPULZE_TIME_CHECK_RESOLUTION_IN_MS = 500

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

const floorMillisecondsToNearestSecond = (milliseconds: number) => {
  return Math.floor(milliseconds / 1000) * 1000
}

const generateImpulzeAndReturnMetadata = async (impulze: Impulze) => {
  let canActivateImpulze = Notification.permission === 'granted'

  // upon first impulze activation, ask for permission
  if (!canActivateImpulze) {
    canActivateImpulze = await requestNativeNotificationPermission()
  }

  // if the permission was given, trigger the notification
  if (canActivateImpulze) {
    const msRemainingUntilNotificationTriggers = ref(impulze.period)
    let remainingDuration = impulze.period

    const intervalId = window.setInterval(() => {
      msRemainingUntilNotificationTriggers.value = floorMillisecondsToNearestSecond(remainingDuration)

      if (remainingDuration === 0) {
        remainingDuration = impulze.period

        triggerNativeNotification(impulze.name, impulze.description)
      } else {
        remainingDuration -= IMPULZE_TIME_CHECK_RESOLUTION_IN_MS
      }
    }, IMPULZE_TIME_CHECK_RESOLUTION_IN_MS)

    return {
      intervalId,
      msRemainingUntilNotificationTriggers
    }
  }

  return null
}

export const useImpulzeStore = defineStore('impulzes', {
  state: () => {
    return {
      activeImpulzes: [] as ImpulzeResponseWithMetadata[],
    }
  },
  getters: {
    impulzeIsActive (state) {
      return (impulze: ImpulzeResponse) => {
        return state.activeImpulzes.findIndex(
          activeImpulze => {
            return activeImpulze.impulze.id === impulze.id
          }
        ) > -1
      }
    },
    getMsUntilImpulzeIsTriggered (state) {
      return (impulze: ImpulzeResponse) => {
        const foundImpulze = state.activeImpulzes.find(
          activeImpulze => {
            return activeImpulze.impulze.id === impulze.id
          }
        )

        return foundImpulze?.metadata.msRemainingUntilNotificationTriggers || -1
      }
    }
  },
  actions: {
    async activateImpulze (impulze: ImpulzeResponse) {
      const impulzeAlreadyActive = this.impulzeIsActive(impulze)
      if (!impulzeAlreadyActive) {
        const metadata = await generateImpulzeAndReturnMetadata(impulze)
        if (metadata?.intervalId) {
          const impulzeInterval: ImpulzeResponseWithMetadata = {
            impulze,
            metadata
          }
          this.activeImpulzes.push(impulzeInterval)
        }
      }
    },
    deactivateImpulze (impulze: ImpulzeResponse) {
      const activeImpulzeIndex = this.activeImpulzes.findIndex(activeImpulze => activeImpulze.impulze.id === impulze.id)
      const activeImpulze = this.activeImpulzes[activeImpulzeIndex]

      if (activeImpulzeIndex > -1) {
        clearInterval(activeImpulze.metadata.intervalId)
        this.activeImpulzes.splice(activeImpulzeIndex, 1)
      }
    },
    async activateImpulzes (impulzes: ImpulzeResponse[]) {
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
